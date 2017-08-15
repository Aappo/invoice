"use strict";

const assert = require('assert');
const isLessThan = require('./isLessThan');
const expect = require('chai').expect;
/**
 * Unit test for isLessThan conditions
 *
 * @author Daniel Zhitomirsky
 */
describe("conditions.isLessThan tests:", () => {
  it('correct comparison with expected parameters', () => {
    expect(isLessThan({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: 100 }
    })).to.be.true;

    expect(isLessThan({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: 300 }
    })).to.be.false;

    expect(isLessThan({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: undefined}
    })).to.be.false;
  });

  it('throws errors in case incorrect parameters', () => {
    expect(() => isLessThan({
      amount: undefined,
      field: 'grossAmount',
      object: { grossAmount: 100 }
    })).to.throw();

    expect(() => isLessThan({
      amount: 200,
      field: undefined,
      object: { grossAmount: 300 }
    })).to.throw();

    expect(() => isLessThan({
      amount: 200,
      field: 'invalid_field',
      object: undefined
    })).to.throw();

    expect(() => isLessThan({
      amount: undefined,
      field: undefined,
      object: undefined
    })).to.throw();
  });
});
