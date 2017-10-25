const number = require('./index');

const methods = [
  'between',
  'equals',
  'greaterThan',
  'gt',
  'isInt',
  'isInteger',
  'isNaN',
  'isNan',
  'isNegative',
  'isNumber',
  'isPositive',
  'lessThan',
  'lt',
  'max',
  'min',
  'notNaN',
  'notNan'
];

methods.forEach(method => {
  test(`number exports ${method}`, () => {
    expect(number[method]).toBe(require(`./${method}`));
  });
});