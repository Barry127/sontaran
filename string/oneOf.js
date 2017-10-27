const validArray = require('../array/isArray')();
const contains = require('../array/contains');

function oneOf (expectedValues) {
  if (!validArray(expectedValues)) {
    throw new TypeError('oneOf: expectedValues argument is not an array');
  }

  return value => contains(value)(expectedValues);
}

module.exports = oneOf;
