'use strict';

const Promise = require('bluebird');
const assert = require('assert');
const fs = require('fs');
const schema = require("./ApprovalSchema.json");
const { MachineDefinition, Machine } = require('@opuscapita/fsm-core');

const machineDefinition = new MachineDefinition({
  schema: schema,
  conditions: require('./conditions'),
  actions: require('./actions')
});

const machine = new Machine({ machineDefinition });

const assertAvailableTransitions = (object, request, expected) => {
  return machine.availableTransitions({ object: object, request: request }).then(({ transitions }) => {
    const availableTransitions = transitions.map(transition => transition.event);
    return Promise.resolve(assert.deepEqual(availableTransitions.sort(), expected.sort()));
  });
};

const assertAvailableAutoTransitions = (object, expected) => {
  return machine.availableAutomaticTransitions({ object: object }).then(({ transitions }) => {
    const availableAutoTransitions = transitions.map(transition => transition.event);
    return Promise.resolve(assert.deepEqual(availableTransitions.sort(), expected.sort()));
  });
};

/**
 * Unit tests for invoice approval
 */
describe("Invoice approval flow", () => {
  describe("Invoice approver:", () => {
    const request = { roles: ['invoice-approver'] };

    describe("Available transitions:", () => {

      it("inspectionRequired", () => {
        const invoice = { status: 'inspectionRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("inspClrRequired", () => {
        const invoice = { status: 'inspClrRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("approvalRequired", () => {
        const invoice = { status: 'approvalRequired' };
        const expected = ['approve', 'sendToClarification', 'postComment', 'rejectInspection'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { status: 'appClrRequired' };
        const expected = ['clarifyForApproval', 'postComment'];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("Send event:", () => {
      it("inspect invoice", (done) => {
        const invoice = { status: 'inspectionRequired' };
        machine.sendEvent({ event: 'inspect', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("set invoice to clarification for inspection", (done) => {
        const invoice = { status: 'inspectionRequired' };
        machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("clarify invoice for inspection", (done) => {
        const invoice = { status: 'inspClrRequired' };
        machine.sendEvent({ event: 'clarifyForInspection', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("approve invoice", () => {
        const invoice = { status: 'approvalRequired' };
        return machine.sendEvent({ event: 'approve', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approved');
        });
      });

      it("set invoice to clarification for approval", () => {
        const invoice = { status: 'approvalRequired' };
        return machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'appClrRequired');
        });
      });

      it("clarify invoice for approval", () => {
        const invoice = { status: 'appClrRequired' };
        return machine.sendEvent({ event: 'clarifyForApproval', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        });
      });
    });
  });

  describe("Invoice inspector", () => {
    const request = { roles: ['invoice-inspector'] };

    describe("Available transitions:", () => {

      it("inspectionRequired", () => {
        const invoice = { status: 'inspectionRequired' };
        const expected = ['inspect', 'sendToClarification', 'postComment'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("inspClrRequired", () => {
        const invoice = { status: 'inspClrRequired' };
        const expected = ['clarifyForInspection', 'postComment'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("approvalRequired", () => {
        const invoice = { status: 'approvalRequired' };
        const expected = ['rejectInspection'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { status: 'appClrRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("Send event:", () => {
      it("inspect invoice", () => {
        const invoice = { status: 'inspectionRequired' };
        return machine.sendEvent({ event: 'inspect', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        });
      });

      it("set invoice to clarification for inspection", () => {
        const invoice = { status: 'inspectionRequired' };
        return machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'inspClrRequired');
        });
      });

      it("clarify invoice for inspection", () => {
        const invoice = { status: 'inspClrRequired' };
        return machine.sendEvent({ event: 'clarifyForInspection', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'inspectionRequired');
        });
      });

      it("approve invoice", (done) => {
        const invoice = { status: 'approvalRequired' };
        machine.sendEvent({ event: 'approve', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("set invoice to clarification for approval", (done) => {
        const invoice = { status: 'approvalRequired' };
        machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("clarify invoice for approval", (done) => {
        const invoice = { status: 'appClrRequired' };
        machine.sendEvent({ event: 'clarifyForApproval', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });
    });
  });

  describe('check of automatic transitions', () => {
    assertAvailableAutoTransitions(
      { status: 'inspectionRequired', grossPrice: 100 },
      ['automatic-inspect']
    );

    assertAvailableAutoTransitions(
      { status: 'inspectionRequired', grossPrice: 300 },
      []
    );
  })
});
