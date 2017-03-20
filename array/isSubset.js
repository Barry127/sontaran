const isArray = require('./isArray');
const contains = require('./contains');

/**
 * Check if array is subset of superset
 * @param  {Array}   array    Array to check
 * @param  {Array}   superset Array should be a subset of this array
 * @return {Boolean}          Result
 */
function isSubset (array, superset) {
  if (!isArray(array) || !isArray(superset)) {
    return false;
  }

  return array.reduce((valid, element) => {
    if (!valid) {
      return false;
    }

    return contains(superset, element);
  }, true);
}

module.exports = isSubset;
