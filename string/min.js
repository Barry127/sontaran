const validNumber = require('../number/isNumber')();

function min (minLength) {
  if (!validNumber(minLength)) {
    throw new TypeError('min: minLength argument is not a number');
  }

  return value => value.length >= minLength;
}

module.exports = min;
