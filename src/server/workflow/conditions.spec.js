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

  it('returns false in case null or undefined requies', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: 'invoice-approver'
    }), false);

    assert.equal(conditions.userHasRoles({
      restrictedRoles: ['invoice-approver'],
      request: null
    }), false);
  });

  it('returns true in case empty or null restricted roles', () => {
    assert.equal(conditions.userHasRoles({
      restrictedRoles: [],
      request: {roles: ['user']}
    }), true);

    assert.equal(conditions.userHasRoles({
      restrictedRoles: null,
      request: {roles: ['user']}
    }), true);

    assert.equal(conditions.userHasRoles({
      request: {roles: ['user']}
    }), true);

    assert.equal(conditions.userHasRoles({
      restrictedRoles: [],
      request: {roles: []}
    }), true);
  });
});
