//TODO: separate code into several modules inside approval
//logical separation will be like:
//a: task manager init
//b: get endpoints
//c: post endpoints

const { MachineDefinition, Machine } = require('@opuscapita/fsm-core');
const { TaskManager } = require('@opuscapita/fsm-task-manager');
const _ = require('lodash');
const Promise = require('bluebird');
var NotFoundError = require('epilogue').Errors.NotFoundError;

module.exports = (app, epilogue, db) => {
  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      schema: require('../../workflow/ApprovalSchema.json'),
      conditions: require('../../workflow/conditions'),
      actions: require('../../workflow/actions')
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
      // TODO: Try to combine it into a single query
      return db.models.PurchaseInvoice.findAll(query).filter(task =>
        db.models.PurchaseInvoiceItem.count(
          {
            where: { 'purchaseInvoiceId': { $eq: task.id }, 'purchaseOrderId': { $ne: null } }
          }
        ).then(matchedItems => matchedItems === 0)
      )
    },
    update: invoice => {
      return invoice.save();
    }
  });

  invoiceTaskManager.run(5000);

  const notFoundCallback = (req, res, context) => {
    throw new NotFoundError();
  };

  /**
   * Finds difference between availableTransitions and automaticTransitions
   * to find only manual events
   *
   * @param invoice PurchaseInvoice instance
   * @param request some dynamic data
   */
  const getManualInvoiceTransitions = ({invoice, request}) => {
    return Promise.props({
      allAvailableTransitions: invoiceTaskManager.machine.availableTransitions({object: invoice, request}),
      automaticTransitions: invoiceTaskManager.machine.availableAutomaticTransitions({object: invoice})
    }).then(({allAvailableTransitions, automaticTransitions}) => {
      return Promise.resolve(_.filter(allAvailableTransitions.transitions, (transition) => !_.find(automaticTransitions.transitions, transition)))
    });
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
              return Promise.filter(foundTasks, (task) => getManualInvoiceTransitions({
                invoice: task.get({ plain: true }),
                request: {
                  roles: req.opuscapita.userData('roles'),
                  referer: req.headers.referer
                }
              }).then((transitions) => transitions.length > 0));
            }
            return Promise.resolve(foundTasks);
          }).then((foundTasks) => {
            if (req.query.processedByMe === 'true') {
              return Promise.filter(foundTasks, (task) =>
                task.inspectedBy === req.opuscapita.userData('id') ||
                task.approvedBy === req.opuscapita.userData('id')
              )
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
    db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      if (invoice) {
        getManualInvoiceTransitions({
          invoice: invoice.get({ plain: true }),
          request: {
            roles: req.opuscapita.userData('roles'),
            referer: req.headers.referer
          }
        }).then(transitions => {
          res.send(transitions);
        }).catch(err => console.log(err))
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
    }).then(tasks => {
      return Promise.props(
        _.reduce(tasks, (accum, task) => {
          accum[task.id] = invoiceTaskManager.machine.availableTransitions({
            object: task.get({
              plain: true
            }),
            request: {
              roles: req.opuscapita.userData('roles'),
              referer: req.headers.referer
            }
          }).then(transitions => Promise.resolve(transitions.transitions));

          return accum;
        }, {})
      ).then(groupedTransitions => res.send(groupedTransitions));
    });
  });

  app.post('/api/approval/events/:id/:event', (req, res) => {
    db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      return invoiceTaskManager.sendEvent({
        object: invoice,
        event: req.params.event,
        request: {
          userId: req.opuscapita.userData('id'),
          roles: req.opuscapita.userData('roles'),
          referer: req.headers.referer
        }
      }).then(updatedInvoice => {
        res.send(updatedInvoice);
      }).catch((errors) => {
        console.error(errors);
        res.status(500).send(errors);
      })
    })
  })
};
