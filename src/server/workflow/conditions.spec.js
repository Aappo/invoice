"use strict";

const assert = require('assert');
const conditions = require('./conditions');

describe("Approval workflow conditions:", () => {
  it('correct role inclusion', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: ['invoice-approver', 'invoice-inspector'],
      request: {
        roles: ['user', 'invoice-approver']
      }

    }), true);
  });

  it('incorrect role inclusion', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: ['invoice-approver', 'invoice-inspector'],
      request: {
        roles: ['user']
      }
    }), false);
  });

  it('correct work in case of a single, non-array parameter', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: 'invoice-approver',
      request: {
        roles: ['user', 'invoice-approver']
      }
    }), true);
  });

  it('fails in case of empty request provided roles', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: 'invoice-approver',
      request: {}
    }), false);

    assert.equal(conditions.userHasRoles({
      restrictedRoles: ['invoice-approver'],
      request: {}
    }), false);
  });

});
