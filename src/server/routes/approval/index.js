const {
  MachineDefinition,
  Machine
} = require('@opuscapita/fsm-core');
const { TaskManager }= require('@opuscapita/fsm-task-manager');
const _ = require('lodash');
const Promise = require('bluebird');
var NotFoundError = require('epilogue').Errors.NotFoundError;

module.exports = (app, epilogue, db) => {

  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      schema: require('../../workflow/InvoiceApproval.json')
    })
  });

  const invoiceTaskManager = new TaskManager({
    machine: machine,
    search: ({count = 5, offset = 0}) => {
      return db.models.InvoiceReceipt.findAll({
        limit: parseInt(count),
        offset: parseInt(offset)
      });
    },
    update: (invoice) => {
      return invoice.save();
    }
  });

  invoiceTaskManager.run(5000);

  const notFoundCallback = (req, res, context) => {throw new NotFoundError();}


  epilogue.resource({
    model: db.models.InvoiceReceipt,
    endpoints: [
      '/approval/tasks',
      '/approval/tasks/:id'
    ]
  }).use({
    list: {
      fetch: {
        before: (req, res, context) => {
          const { query } = req;
          invoiceTaskManager.list({searchParams: query}).then((foundTasks) => {
            context.instance = foundTasks;
            context.continue();
          })
        }
      }
    },
    create: {
      write: {
        before: notFoundCallback
      }
    },
    delete: {
      fetch: {
        before: notFoundCallback
      }
    },
    read: {
      fetch: {
        before: notFoundCallback
      }
    }
  });

  app.get('/api/approval/events/:id', (req, res) => {
    db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
      if(invoice) {
       invoiceTaskManager.machine.availableTransitions({
         object: invoice.get({
           plain: true
         })
       }).then((transitions) => {
         res.send(transitions.transitions);
       }).catch((err) => console.log(err))
      } else {
        res.send({})
      }
    })
  });


  app.get('/api/approval/events', (req, res) => {
    return invoiceTaskManager.list({
      searchParams: {
        count: req.query.count,
        offset: req.query.offset
      }
    }).then((tasks) => {
      return Promise.props(
        _.reduce(tasks, (accum, task) => {
          accum[task.key] = invoiceTaskManager.machine.availableTransitions({
            object: task.get({
              plain: true
            })
          }).then((transitions) => Promise.resolve(transitions.transitions));

          return accum;
        }, {})
      ).then((groupedTransitions) => res.send(groupedTransitions));
    });
  });

  app.post('/api/approval/events/:id/:event', (req, res) => {
    db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
      invoiceTaskManager.sendEvent({
        object: invoice,
        event: req.params.event
      }).then((updatedInvoice) => {
        res.send(JSON.stringify(updatedInvoice))
      }).catch((errors) => {
        console.error(errors);
        res.status(500).send(errors);
      })
    })
  })
};
