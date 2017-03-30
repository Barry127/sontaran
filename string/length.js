const isNumber = require('../number/isNumber');
const isString = require('./isString');

/**
 * Check if value has extactly length length
 * @param  {String} value  Value to check
 * @param  {Number} length Length value should have
 * @return {Boolean}       Result
 */
function length (value, length) {
  if (!isString(value)) {
    return false;
  }

  if (!isNumber(length)) {
    return false;
  }

  return value.length === length;
}

module.exports = length;
