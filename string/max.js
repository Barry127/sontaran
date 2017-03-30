const isNumber = require('../number/isNumber');
const isString = require('./isString');

/**
 * Check if value has a max length of max (inclusive)
 * @param  {String} value Value to check
 * @param  {Number} max   Max length value should be
 * @return {Boolean}      Result
 */
function max (value, max) {
  if (!isString(value)) {
    return false;
  }

  if (!isNumber(max)) {
    return false;
  }

  return value.length <= max;
}

module.exports = max;
