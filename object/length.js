const getOwnProperties = require('../helpers/getOwnProperties');
const isNumber = require('../number/isNumber');
const isObject = require('./isObject');

/**
 * Check if object has length of own properties length
 * @param  {Object} object Object to check
 * @param  {Number} length Length of own properties object should have
 * @return {Boolean}       Result
 */
function length (object, length) {
  if (!isObject(object)) {
    return false;
  }

  if (!isNumber(length)) {
    return false;
  }

  return getOwnProperties(object).length === length;
}

module.exports = length;
