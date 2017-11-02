const validNumber = require('../number/isNumber')();

function max (maxLength) {
  if (!validNumber(maxLength)) {
    throw new TypeError('max: maxLength argument is not a number');
  }

  return value => Object.keys(value).length <= maxLength;
}

module.exports = max;
