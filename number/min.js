const validNumber = require('./isNumber')();

function min (min) {
  if (!validNumber(min)) {
    throw new TypeError('min: min argument is not a valid number');
  }

  return value => value >= min;
}

module.exports = min;
