const getOwnProperties = require('../helpers/getOwnProperties');
const isNumber = require('../number/isNumber');
const isObject = require('./isObject');

/**
 * Check if object has max length of own properties of max (inclusive)
 * @param  {Object} object Object to check
 * @param  {Number} length Max length of own properties object should have
 * @return {Boolean}       Result
 */
function max (object, max) {
  if (!isObject(object)) {
    return false;
  }

  if (!isNumber(max)) {
    return false;
  }

  return getOwnProperties(object).length <= max;
}

module.exports = max;
