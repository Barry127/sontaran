const getOwnProperties = require('../helpers/getOwnProperties');
const isArray = require('../array/isArray');
const isSubset = require('../array/isSubset');

/**
 * Check if object has keys (own property) keys
 * @param  {Object}  object Object to check
 * @param  {Array}   keys   Array of keys object should have
 * @return {Boolean}        Result
 */
function hasKeys (object, keys) {
  if (!isArray(keys)) {
    return false;
  }

  return isSubset(keys, getOwnProperties(object));
}

module.exports = hasKeys;
