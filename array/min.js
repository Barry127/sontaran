const isArray = require('./isArray');
const isNumber = require('../number/isNumber');

/**
 * Check if array has a min length of min (inclusive)
 * @param  {Array}  array  Array to check
 * @param  {Number} min    Min length array should be
 * @return {Boolean}       Result
 */
function min (array, min) {
  if (!isArray(array)) {
    return false;
  }

  if (!isNumber(min)) {
    return false;
  }

  return array.length >= min;
}

module.exports = min;
