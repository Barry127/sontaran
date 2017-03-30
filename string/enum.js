const contains = require('../array/contains');

/**
 * Check if value is one of in list allowed values
 * @param  {String} value Value to check
 * @param  {Array}  list  Array of possible values
 * @return {Boolean}      Result
 */
function _enum (value, list) {
  return contains(list, value);
}

module.exports = _enum;
