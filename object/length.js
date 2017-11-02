const validNumber = require('../number/isNumber')();

function length (expectedLength) {
  if (!validNumber(expectedLength)) {
    throw new TypeError('length: expectedLength argument is not a number');
  }

  return value => Object.keys(value).length === expectedLength;
}

module.exports = length;
