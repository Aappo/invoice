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
      return db.models.InvoiceReceipt.update(invoice,{
        where: {
          id: {
            $eq: invoice.id
          }
        }
      })
    }
  });

  invoiceTaskManager.run(1000);


  app.get('/api/approval/tasks', (req, res) => {
    invoiceTaskManager.list({}).then((tasks) => {
      res.send({tasks: tasks})
    })
  });

  app.get('/api/approval/availableEvents/:id', (req, res) => {

  });

  app.put('/api/approval/sendEvent/:id/:event', (req, res) => {

  })
};
