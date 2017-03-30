const isNumber = require('../number/isNumber');
const isString = require('./isString');

/**
 * Check if value has a min length of min (inclusive)
 * @param  {String} value Value to check
 * @param  {Number} min   Min length value should be
 * @return {Boolean}      Result
 */
function min (value, min) {
  if (!isString(value)) {
    return false;
  }

  if (!isNumber(min)) {
    return false;
  }

  return value.length >= min;
}

module.exports = min;
