const getOwnProperties = require('../helpers/getOwnProperties');
const isObject = require('./isObject');
const isSubset = require('./isSubset');

/**
 * Check if values of object equal the values of expected
 * @param  {Object} object   Object to check
 * @param  {Object} expected Expected values for object
 * @return {Boolean}         Result
 */
function equals (object, expected) {
  if (!isObject(object) || !isObject(expected)) {
    return false;
  }

  if (getOwnProperties(object).length !== getOwnProperties(expected).length) {
    return false;
  }

  return isSubset(expected, object);
}

module.exports = equals;
