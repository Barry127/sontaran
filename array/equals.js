const isArray = require('./isArray');
const isSubset = require('./isSubset');

/**
 * Check if values of array equal the values of expected
 * @param  {Array} array    Array to check
 * @param  {Array} expected Expected values for array
 * @return {Boolean}        Result
 */
function equals (array, expected) {
  if (!isArray(array) || !isArray(expected)) {
    return false;
  }

  if (array.length !== expected.length) {
    return false;
  }

  return isSubset(expected, array);
}

module.exports = equals;
