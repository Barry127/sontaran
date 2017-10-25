const number = {};
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
  number[method] = require(`./${method}`);
});

module.exports = number;
