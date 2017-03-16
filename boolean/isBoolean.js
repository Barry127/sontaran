const checkType = require('../helpers/checkType');

/**
 * Check if value is of type boolean
 * @param  {Mixed}   value Value to check
 * @return {Boolean}       Result
 */
function isBoolean (value) {
  return checkType(value, 'boolean');
}

module.exports = isBoolean;
