const checkType = require('../helpers/checkType');

/**
 * Check if value is of type string
 * @param  {Mixed}    value Value to check
 * @return {Boolean}  Result
 */
function isString (value) {
  return checkType(value, 'string');
}

module.exports = isString;
