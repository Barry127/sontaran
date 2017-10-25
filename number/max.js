const validNumber = require('./isNumber')();

function max (max) {
  if (!validNumber(max)) {
    throw new TypeError('max: max argument is not a valid number');
  }

  return value => value <= max;
}

module.exports = max;
