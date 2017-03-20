const checkType = require('../helpers/checkType');

/**
 * Check if value is of type object
 * @param  {Mixed}    value Value to check
 * @return {Boolean}  Result
 */
function isObject (value) {
  return checkType(value, 'object');
}

module.exports = isObject;
