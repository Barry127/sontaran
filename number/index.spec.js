const { expect } = require('chai');
const number = require('./index');

describe('number', () => {

  const methods = [
    'between',
    'equals',
    'greaterThan',
    'isInteger',
    'isNaN',
    'isNegative',
    'isNumber',
    'isPositive',
    'lessThan',
    'max',
    'min',
    'notNaN'
  ];

  methods.forEach(method => {
    it(`number exports ${method}`, () => {
      expect(number[method]).to.be.a('function');
    });
  });

});
