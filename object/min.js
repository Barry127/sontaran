const getOwnProperties = require('../helpers/getOwnProperties');
const isNumber = require('../number/isNumber');
const isObject = require('./isObject');

/**
 * Check if object has min length of own properties of min (inclusive)
 * @param  {Object} object Object to check
 * @param  {Number} length Min length of own properties object should have
 * @return {Boolean}       Result
 */
function min (object, min) {
  if (!isObject(object)) {
    return false;
  }

  if (!isNumber(min)) {
    return false;
  }

  return getOwnProperties(object).length >= min;
}

module.exports = min;
