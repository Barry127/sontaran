const isNumber = require('../number/isNumber');
const isString = require('./isString');

/**
 * Check if length of value is between min and max (both inclusive)
 * @param  {String} value String to check
 * @param  {Number} min   Min length for value
 * @param  {Number} max   Max length for value
 * @return {Boolean}      Result
 */
function between (value, min, max) {
  if (!isString(value)) {
    return false;
  }

  if (!isNumber(min) || !isNumber(max)) {
    return false;
  }

  return value.length >= min && value.length <= max;
}

module.exports = between;
