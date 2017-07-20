//TODO: separate code into several modules inside approval
//logical separation will be like:
//a: task manager init
//b: get endpoints
//c: post endpoints

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
      schema: require('../../workflow/InvoiceApproval.json'),
      conditions: {
        userHasRole: ({ role, request }) => {
          const roles = request ? request.roles : [];
          return roles.includes(role);
        }
      },
      actions: {
        updateComment: ({object, commentFieldName, request}) => {
          object[commentFieldName] = request.comment;
        }
      }
    })
  });

  const invoiceTaskManager = new TaskManager({
    machine: machine,
    search: ({ limit, offset = 0, customerId }) => {
      let query = Object.assign(
        {},
        limit ? { limit } : {},
        { offset },
        {
          where: customerId ? { customerId } : {}
        }
      );

      return db.models.InvoiceReceipt.findAll(query);
    },
    update: (invoice) => {
      return invoice.save();
    }
  });

  invoiceTaskManager.run(5000);

  const notFoundCallback = (req, res, context) => {
    throw new NotFoundError();
  };


  epilogue.resource({
    model: db.models.InvoiceReceipt,
    endpoints: [
      '/approval/tasks',
      '/approval/tasks/:id'
    ]
  }).use({
    list: {
      fetch: {
        action: (req, res, context) => {
          invoiceTaskManager.list(
            {
              searchParams: Object.assign(
                {},
                req.query,
                req.query.count ? { limit: parseInt(req.query.count) } : {},
                req.query.offset ? { offset: parseInt(req.query.offset) } : {},
                {
                  customerId: req.opuscapita.userData().customerid
                }
              )
            }
          ).then((foundTasks) => {
            if (req.query.assignedToMe === 'true') {
              return Promise.filter(foundTasks, (task) => invoiceTaskManager.machine.availableTransitions({
                object: task.get({ plain: true }), request: { roles: req.opuscapita.userData('roles') }
              }).then((transitions) => transitions.transitions.length > 0));
            }
            return Promise.resolve(foundTasks);
          }).then((foundTasks) => {
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
      if (invoice) {
        invoiceTaskManager.machine.availableTransitions({
          object: invoice.get({
            plain: true
          }),
          request: { roles: req.opuscapita.userData('roles') }
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
      searchParams: Object.assign(
        {},
        req.query,
        req.query.count ? { limit: parseInt(req.query.count) } : {},
        req.query.offset ? { offset: parseInt(req.query.offset) } : {},
        {
          customerId: req.opuscapita.userData().customerid
        }
      )
    }).then((tasks) => {
      return Promise.props(
        _.reduce(tasks, (accum, task) => {
          accum[task.key] = invoiceTaskManager.machine.availableTransitions({
            object: task.get({
              plain: true
            }),
            request: { roles: req.opuscapita.userData('roles') }
          }).then((transitions) => Promise.resolve(transitions.transitions));

          return accum;
        }, {})
      ).then((groupedTransitions) => res.send(groupedTransitions));
    });
  });

  app.post('/api/approval/events/:id/:event', (req, res) => {
    db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
      return invoiceTaskManager.sendEvent({
        object: invoice,
        event: req.params.event,
        request: {
          roles: req.opuscapita.userData('roles'),
          comment: req.body.comment
        }
      }).then((updatedInvoice) => {
        res.send(JSON.stringify(updatedInvoice))
      }).catch((errors) => {
        console.error(errors);
        res.status(500).send(errors);
      })
    })
  })
};
