const validObject = require('./isObject')();
const isSubset = require('./isSubset');

function equals (expectedValue) {
  if (!validObject(expectedValue)) {
    throw new TypeError('equals: expectedValue argument is not an object');
  }

  return value => Object.keys(value).length === Object.keys(expectedValue).length && isSubset(expectedValue)(value);
}

module.exports = equals;
