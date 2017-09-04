"use strict";

const assert = require('assert');
const restrictForViews = require('./restrictForViews');
const { INVOICE_VIEWS } = require('../../../common/constants');

/**
 * Unit test for restrictForViews condition.
 *
 * @author Anton Levchuk
 */
describe("conditions.restrictForViews tests:", () => {
  it('restriction is applied if referer url and views are matched', () => {
    assert.equal(restrictForViews({ request: { referer: INVOICE_VIEWS.PROCESSED_TASKS.path }, views: ['PROCESSED_TASKS', 'MY_TASKS'] }), false)
  });

  it('restriction is not applied if referer url and views are not matched', () => {
    assert.equal(restrictForViews({ request: { referer: INVOICE_VIEWS.ALL_TASKS.path }, views: ['PROCESSED_TASKS', 'MY_TASKS'] }), true)
  });

  it('exception is thrown if view is not found', () => {
    assert.throws(() => restrictForViews({ request: { referer: INVOICE_VIEWS.PROCESSED_TASKS.path }, views: ['NOT_EXISTING_VIEW'] }))
  });

  it('restriction is not applied if referer was not provided', () => {
    assert.equal(restrictForViews({ request: {}, views: ['MY_TASKS'] }), true)
  });
});
