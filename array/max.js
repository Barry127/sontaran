const isArray = require('./isArray');
const isNumber = require('../number/isNumber');

/**
 * Check if array has a max length of max (inclusive)
 * @param  {Array}  array  Array to check
 * @param  {Number} max    Max length array should be
 * @return {Boolean}       Result
 */
function max (array, max) {
  if (!isArray(array)) {
    return false;
  }

  if (!isNumber(max)) {
    return false;
  }

  return array.length <= max;
}

module.exports = max;
