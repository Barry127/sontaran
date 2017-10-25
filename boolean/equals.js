const validBool = require('./isBoolean')();

function equals (expectedValue) {
  if (!validBool(expectedValue)) {
    throw new TypeError('equals: expectedValue argument is not a boolean');
  }

  return value => value === expectedValue;
}

module.exports = equals;
