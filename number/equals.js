const validNumber = require('./isNumber')();

function equals (expectedValue) {
  if (!validNumber(expectedValue)) {
    throw new TypeError('equals: expectedValue argument is not a valid number');
  }

  return value => value === expectedValue;
}

module.exports = equals;
