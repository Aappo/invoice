"use strict";

const assert = require('assert');
const userHasRoles = require('./userHasRoles');

describe("conditions.userHasRoles tests:", () => {
  it('correct role inclusion', () => {
    assert.equal(userHasRoles({
      restrictedRoles: ['invoice-approver', 'invoice-inspector'],
      request: {
        roles: ['user', 'invoice-approver']
      }

    }), true);
  });

  it('incorrect role inclusion', () => {
    assert.equal(userHasRoles({
      restrictedRoles: ['invoice-approver', 'invoice-inspector'],
      request: {
        roles: ['user']
      }
    }), false);
  });

  it('correct work in case of a single, non-array parameter', () => {
    assert.equal(userHasRoles({
      restrictedRoles: 'invoice-approver',
      request: {
        roles: ['user', 'invoice-approver']
      }
    }), true);
  });

  it('fails in case of empty request provided roles', () => {
    assert.equal(userHasRoles({
      restrictedRoles: 'invoice-approver',
      request: {}
    }), false);

    assert.equal(userHasRoles({
      restrictedRoles: ['invoice-approver'],
      request: {}
    }), false);
  });

  it('returns false in case null or undefined requies', () => {
    assert.equal(userHasRoles({
      restrictedRoles: 'invoice-approver'
    }), false);

    assert.equal(userHasRoles({
      restrictedRoles: ['invoice-approver'],
      request: null
    }), false);
  });

  it('returns true in case empty or null restricted roles', () => {
    assert.equal(userHasRoles({
      restrictedRoles: [],
      request: {roles: ['user']}
    }), true);

    assert.equal(userHasRoles({
      restrictedRoles: null,
      request: {roles: ['user']}
    }), true);

    assert.equal(userHasRoles({
      request: {roles: ['user']}
    }), true);

    assert.equal(userHasRoles({
      restrictedRoles: [],
      request: {roles: []}
    }), true);
  });
});
