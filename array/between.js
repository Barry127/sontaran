const isArray = require('./isArray');
const isNumber = require('../number/isNumber');

/**
 * Check if length of array is between min and max (both inclusive)
 * @param  {Array}  array Array to check
 * @param  {Number} min   Min length for array
 * @param  {Number} max   Max length for array
 * @return {Boolean}      Result
 */
function between (array, min, max) {
  if (!isArray(array)) {
    return false;
  }

  if (!isNumber(min) || !isNumber(max)) {
    return false;
  }

  return array.length >= min && array.length <= max;
}

module.exports = between;
