const isSubset = require('./isSubset');

/**
 * Check if object is superset of subset
 * @param  {Object}  object   Object to check
 * @param  {Object}  superset Object should be a superset of this object
 * @return {Boolean}          Result
 */
function isSuperset (object, subset) {
  return isSubset(subset, object);
}

module.exports = isSuperset;
