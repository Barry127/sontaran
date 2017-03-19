const checkType = require('../helpers/checkType');

/**
 * Check if value is of type number
 * @param  {Mixed}    value Value to check
 * @return {Boolean}  Result
 */
function isNumber (value) {
  return checkType(value, 'number');
}

module.exports = isNumber;
