'use strict';

const assert = require('assert');
const fs = require('fs');
const schema = require("../src/flow-schema.json");
const { MachineDefinition, Machine } = require('@opuscapita/fsm-core');

const machineDefinition = new MachineDefinition({
  schema: schema,
  guards: []
});

const machine = new Machine({ machineDefinition });

/**
 * Unit tests for invoiceApprovalFlow
 */
describe("invoice approval flow", () => {

  describe("available transitions", () => {

    it("inspectionRequired", (done) => {
      const invoice = { statusId: 'inspectionRequired' };
      machine.availableTransitions({ object: invoice }).then(({ transitions }) => {
        transitions.forEach((transition) => {
          assert(['inspect', 'sendToClarification'].includes(transition.event));
        });
        done();
      })
    });

    it("requireClarification", (done) => {
      const invoice = { statusId: 'requireClarification' };
      machine.availableTransitions({ object: invoice }).then(({ transitions }) => {
        transitions.forEach((transition) => {
          assert(['clarifyForInspection', 'clarifyForApproval'].includes(transition.event));
        });
        done();
      })
    });

    it("approvalRequired", (done) => {
      const invoice = { statusId: 'approvalRequired' };
      machine.availableTransitions({ object: invoice }).then(({ transitions }) => {
        transitions.forEach((transition) => {
          assert(['approve', 'sendToClarification'].includes(transition.event));
        });
        done();
      })
    })
  });

  describe("send event", () => {

    it("inspect invoice", (done) => {
      const invoice = { statusId: 'inspectionRequired' };
      machine.sendEvent({ event: 'inspect', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        done();
      });
    });

    it("set invoice to clarification for inspection", (done) => {
      const invoice = { statusId: 'inspectionRequired' };
      machine.sendEvent({ event: 'sendToClarification', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'requireClarification');
        done();
      });
    });

    it("clarify invoice for inspection", (done) => {
      const invoice = { statusId: 'requireClarification' };
      machine.sendEvent({ event: 'clarifyForInspection', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'inspectionRequired');
        done();
      });
    });

    it("approve invoice", (done) => {
      const invoice = { statusId: 'approvalRequired' };
      machine.sendEvent({ event: 'approve', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'archived');
        done();
      });
    });

    it("set invoice to clarification for approval", (done) => {
      const invoice = { statusId: 'approvalRequired' };
      machine.sendEvent({ event: 'sendToClarification', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'requireClarification');
        done();
      });
    });

    it("clarify invoice for approval", (done) => {
      const invoice = { statusId: 'requireClarification' };
      machine.sendEvent({ event: 'clarifyForApproval', object: invoice }).then(() => {
        assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        done();
      });
    });
  })
});
