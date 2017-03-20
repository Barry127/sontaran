const isObject = require('./isObject');
const getOwnProperties = require('../helpers/getOwnProperties');

/**
 * Check if object is subset of superset
 * @param  {Object}  object   Object to check
 * @param  {Object}  superset Object should be a subset of this object
 * @return {Boolean}          Result
 */
function isSubset (object, superset) {
  if (!isObject(object) || !isObject(superset)) {
    return false;
  }

  return getOwnProperties(object)
    .reduce((valid, key) => {
      if (!valid) {
        return false;
      }

      return object[key] === superset[key];
    }, true);
}

module.exports = isSubset;
