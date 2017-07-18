'use strict';

const Promise = require('bluebird');
const assert = require('assert');
const fs = require('fs');
const schema = require("./InvoiceApproval.json");
const { MachineDefinition, Machine } = require('@opuscapita/fsm-core');

const machineDefinition = new MachineDefinition({
  schema: schema,
  conditions: {
    userHasRole: ({ role, request }) => {
      const roles = request ? request.roles : [];
      return roles.includes(role);
    }
  }
});

const machine = new Machine({ machineDefinition });

const assertAvailableTransitions = (object, request, expected) => {
  return machine.availableTransitions({ object: object, request: request }).then(({ transitions }) => {
    const availableTransitions = transitions.map(transition => transition.event);
    return Promise.resolve(assert.deepEqual(availableTransitions.sort(), expected.sort()));
  });
};

/**
 * Unit tests for invoice approval
 */
describe("invoice approval flow", () => {

  describe("invoice-approver", () => {

    const request = { roles: ['invoice-approver'] };

    describe("available transitions", () => {

      it("inspectionRequired", () => {
        const invoice = { statusId: 'inspectionRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("inspClrRequired", () => {
        const invoice = { statusId: 'inspClrRequired' };
        const expected = ['clarifyForInspection'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("approvalRequired", () => {
        const invoice = { statusId: 'approvalRequired' };
        const expected = ['approve', 'sendToClarification'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { statusId: 'appClrRequired' };
        const expected = ['clarifyForApproval'];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("send event", () => {

      it("inspect invoice", (done) => {
        const invoice = { statusId: 'inspectionRequired' };
        machine.sendEvent({ event: 'inspect', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("set invoice to clarification for inspection", (done) => {
        const invoice = { statusId: 'inspectionRequired' };
        machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("clarify invoice for inspection", () => {
        const invoice = { statusId: 'inspClrRequired' };
        return machine.sendEvent({ event: 'clarifyForInspection', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'inspectionRequired');
        });
      });

      it("approve invoice", () => {
        const invoice = { statusId: 'approvalRequired' };
        return machine.sendEvent({ event: 'approve', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'archived');
        });
      });

      it("set invoice to clarification for approval", () => {
        const invoice = { statusId: 'approvalRequired' };
        return machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'appClrRequired');
        });
      });

      it("clarify invoice for approval", () => {
        const invoice = { statusId: 'appClrRequired' };
        return machine.sendEvent({ event: 'clarifyForApproval', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        });
      });
    });
  });

  describe("invoice-inspector", () => {

    const request = { roles: ['invoice-inspector'] };

    describe("available transitions", () => {

      it("inspectionRequired", () => {
        const invoice = { statusId: 'inspectionRequired' };
        const expected = ['inspect', 'sendToClarification'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("inspClrRequired", () => {
        const invoice = { statusId: 'inspClrRequired' };
        const expected = ['clarifyForInspection'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("approvalRequired", () => {
        const invoice = { statusId: 'approvalRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { statusId: 'appClrRequired' };
        const expected = ['clarifyForApproval'];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("send event", () => {

      it("inspect invoice", () => {
        const invoice = { statusId: 'inspectionRequired' };
        return machine.sendEvent({ event: 'inspect', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        });
      });

      it("set invoice to clarification for inspection", () => {
        const invoice = { statusId: 'inspectionRequired' };
        return machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'inspClrRequired');
        });
      });

      it("clarify invoice for inspection", () => {
        const invoice = { statusId: 'inspClrRequired' };
        return machine.sendEvent({ event: 'clarifyForInspection', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'inspectionRequired');
        });
      });

      it("approve invoice", (done) => {
        const invoice = { statusId: 'approvalRequired' };
        machine.sendEvent({ event: 'approve', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("set invoice to clarification for approval", (done) => {
        const invoice = { statusId: 'approvalRequired' };
        machine.sendEvent({ event: 'sendToClarification', object: invoice, request: request }).catch((error) => {
          assert.ok(true);
          done();
        });
      });

      it("clarify invoice for approval", () => {
        const invoice = { statusId: 'appClrRequired' };
        return machine.sendEvent({ event: 'clarifyForApproval', object: invoice, request: request }).then(() => {
          assert.equal(machine.currentState({ object: invoice }), 'approvalRequired');
        });
      });
    });
  });
});
