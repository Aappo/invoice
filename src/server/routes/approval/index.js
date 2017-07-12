const {
  MachineDefinition,
  Machine
} = require('@opuscapita/fsm-core');

const { TaskManager }= require('@opuscapita/fsm-task-manager');

module.exports = (app, db) => {

  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      schema: require('../../workflow/InvoiceApproval.json')
    })
  });

  const invoiceTaskManager = new TaskManager({
    machine: machine,
    search: (searchParams) => {
      return db.models.InvoiceReceipt.findAll();
    },
    update: (invoice) => {
      return user.changed().length > 0 ? invoice.save() : Promise.resolve();
    }
  });

  invoiceTaskManager.run(1000);


  app.get('/api/approval/tasks', (req, res) => {
    invoiceTaskManager.list({}).then((tasks) => {
      res.send(tasks)
    })
  });

  app.get('/api/approval/events/:id', (req, res) => {
    db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
      if(invoice) {
       invoiceTaskManager.machine.availableTransitions({
         object: invoice.get({
           plain: true
         })
       }).then((transitions) => {
         res.send({transitions});
       })
      } else {
        res.send({})
      }
    })
  });

  app.post('/api/approval/events/:id/:event', (req, res) => {
    db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
      invoiceTaskManager.sendEvent({
        object: invoice.get({
          plain: true
        }),
        event: req.params.event
      }).then((updatedInvoice) => {
        res.send(JSON.stringify(updatedInvoice))
      }).catch((errors) => res.send(errors))
    })
  })
};
