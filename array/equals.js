const validArray = require('./isArray')();
const isSubset = require('./isSubset');

function equals (expectedValue) {
  if (!validArray(expectedValue)) {
    throw new TypeError('equals: expectedValue argument is not an array');
  }

  return value => value.length === expectedValue.length && isSubset(expectedValue)(value);
}

module.exports = equals;
