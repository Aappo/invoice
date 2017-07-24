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
  },
  actions: {
    updateComment: ({ object, commentFieldName, request }) => {
      object[commentFieldName] = request.comment;
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
        const expected = ['approve', 'sendToClarification', 'postComment'];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { status: 'appClrRequired' };
        const expected = ['clarifyForApproval', 'postComment'];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("send event", () => {

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
          assert.equal(machine.currentState({ object: invoice }), 'archived');
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

  describe("invoice-inspector", () => {

    const request = { roles: ['invoice-inspector'] };

    describe("available transitions", () => {

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
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });

      it("appClrRequired", () => {
        const invoice = { status: 'appClrRequired' };
        const expected = [];
        return assertAvailableTransitions(invoice, request, expected);
      });
    });

    describe("send event", () => {

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
});
