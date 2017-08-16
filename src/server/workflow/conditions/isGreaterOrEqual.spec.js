"use strict";

const isGreaterOrEqual = require('./isGreaterOrEqual');
const expect = require('chai').expect;
/**
 * Unit test for isGreaterOrEqualThan conditions
 *
 * @author Daniel Zhitomirsky
 */
describe("conditions.isGreaterOrEqualThan tests:", () => {
  it('correct comparison with expected parameters', () => {
    expect(isGreaterOrEqual({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: 100 }
    })).to.be.false;

    expect(isGreaterOrEqual({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: 300 }
    })).to.be.true;

    expect(isGreaterOrEqual({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: 200 }
    })).to.be.true;

    expect(isGreaterOrEqual({
      amount: 200,
      field: 'grossAmount',
      object: { grossAmount: undefined}
    })).to.be.false;
  });

  it('throws errors in case incorrect parameters', () => {
    expect(() => isGreaterOrEqual({
      amount: undefined,
      field: 'grossAmount',
      object: { grossAmount: 100 }
    })).to.throw();

    expect(() => isGreaterOrEqual({
      amount: 200,
      field: undefined,
      object: { grossAmount: 300 }
    })).to.throw();

    expect(() => isGreaterOrEqual({
      amount: 200,
      field: 'invalid_field',
      object: undefined
    })).to.throw();

    expect(() => isGreaterOrEqual({
      amount: undefined,
      field: undefined,
      object: undefined
    })).to.throw();
  });
});
