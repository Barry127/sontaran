const isArray = require('./isArray');
const isNumber = require('../number/isNumber');

/**
 * Check if array has length length
 * @param  {Array}  array  Array to check
 * @param  {Number} length Length array should be
 * @return {Boolean}       Result
 */
function length (array, length) {
  if (!isArray(array)) {
    return false;
  }

  if (!isNumber(length)) {
    return false;
  }

  return array.length === length;
}

module.exports = length;
