"use strict";

import assert from 'assert';
import UiHelpers from './UIHelpers.react';
const mockData = [
  {
    id: 1,
    stringField: 'abc',
    numberField: 5,
    dateField: '2017-07-25T00:00:00.000Z',
    nullableField: null
  },
  {
    id: 2,
    stringField: 'ijk',
    numberField: 0,
    dateField: '07/26/2017',
    nullableField: 'notNull'
  },
  {
    id: 3,
    stringField: 'dfg',
    numberField: 15,
    dateField: '2017-07-27',
    nullableField: null
  }
];

describe('Invoice comparator:', () => {

  it('sorting by field of string type', () => {
    const actualResult = mockData.slice(0).sort(UiHelpers.getInvoiceComparator('stringField')).map(item => item.id);
    assert.deepEqual(actualResult, [1, 3, 2]);
  });

  it('sorting by field of number type', () => {
    const actualResult = mockData.slice(0).sort(UiHelpers.getInvoiceComparator('numberField')).map(item => item.id);
    assert.deepEqual(actualResult, [2, 1, 3]);
  });

  it('sorting by date field of string type', () => {
    const actualResult = mockData.slice(0).sort(UiHelpers.getInvoiceComparator('dateField')).map(item => item.id);
    assert.deepEqual(actualResult, [3, 2, 1]);
  });

  it('sorting by nullable field', () => {
    const actualResult = mockData.slice(0).sort(UiHelpers.getInvoiceComparator('nullableField')).map(item => item.id);
    assert.deepEqual(actualResult, [2, 1, 3]);
  });
});
