const { MachineDefinition, Machine } = require('@opuscapita/fsm-core');
const { TaskManager }= require('@opuscapita/fsm-task-manager');
const lodash = require('lodash');
const Promise = require('bluebird');
var NotFoundError = require('epilogue').Errors.NotFoundError;

module.exports = (app, epilogue, db) => {
  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      schema: require('../../workflow/InvoiceApproval.json'),
      conditions: {
        userHasRole: ({ role, request }) => {
          const roles = request ? request.roles : [];
          return roles.includes(role);
        }
      }
    })
  });

  const invoiceTaskManager = new TaskManager({
    machine: machine,
    search: ({ count = 5, offset = 0, customerId }) => {
      return db.models.PurchaseInvoice.findAll({
        limit: parseInt(count),
        offset: parseInt(offset),
        where: {
          customerId: customerId
        }
      });
    },
    update: invoice => {
      return invoice.save();
    }
  });

  invoiceTaskManager.run(5000);

  const notFoundCallback = (req, res, context) => {
    throw new NotFoundError();
  };

  epilogue.resource({
    model: db.models.PurchaseInvoice,
    endpoints: [
      '/approval/tasks',
      '/approval/tasks/:id'
    ]
  }).use({
    list: {
      fetch: {
        action: (req, res, context) => {
          invoiceTaskManager.list(
            { searchParams: Object.assign({}, req.query, { customerId: req.opuscapita.userData().customerid }) }
          ).then(foundTasks => {
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
    db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      if (invoice) {
        invoiceTaskManager.machine.availableTransitions({
          object: invoice.get({
            plain: true
          }),
          request: { roles: req.opuscapita.userData('roles') }
        }).then(transitions => {
          res.send(transitions.transitions);
        }).catch(err => console.log(err));
      } else {
        res.send({})
      }
    })
  });


  app.get('/api/approval/events', (req, res) => {
    return invoiceTaskManager.list({
      searchParams: Object.assign({}, req.query, { customerId: req.opuscapita.userData().customerid })
    }).then(tasks => {
      return Promise.props(
        lodash.reduce(tasks, (accum, task) => {
          accum[task.key] = invoiceTaskManager.machine.availableTransitions({
            object: task.get({
              plain: true
            }),
            request: { roles: req.opuscapita.userData('roles') }
          }).then(transitions => Promise.resolve(transitions.transitions));

          return accum;
        }, {})
      ).then(groupedTransitions => res.send(groupedTransitions));
    });
  });

  app.post('/api/approval/events/:id/:event', (req, res) => {
    db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      invoiceTaskManager.sendEvent({
        object: invoice,
        event: req.params.event,
        request: { roles: req.opuscapita.userData('roles') }
      }).then(updatedInvoice => {
        res.send(updatedInvoice);
      }).catch(errors => {
        console.error(errors);
        res.status(500).send(errors);
      })
    })
  })
};
