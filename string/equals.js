const validString = require('./isString')();

function equals (expectedValue) {
  if (!validString(expectedValue)) {
    throw new TypeError('equals: expectedValue argument is not a string');
  }

  return value => value === expectedValue;
}

module.exports = equals;
