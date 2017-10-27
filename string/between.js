const validNumber = require('../number/isNumber')();

function between (min, max) {
  if (!validNumber(min)) {
    throw new TypeError('between: min argument is not a valid number');
  }
  if (!validNumber(max)) {
    throw new TypeError('between: max argument is not a valid number');
  }

  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  return value => value.length >= min && value.length <= max;
}

module.exports = between;
