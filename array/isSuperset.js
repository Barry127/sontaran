const isSubset = require('./isSubset');

/**
 * Check if array is superset of subset
 * @param  {Array}   array    Array to check
 * @param  {Array}   superset Array should be a super of this array
 * @return {Boolean}          Result
 */
function isSuperset (array, subset) {
  return isSubset(subset, array);
}

module.exports = isSuperset;
