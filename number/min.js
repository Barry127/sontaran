const isNumber = require('./isNumber');

/**
 * Check if value is not less than minValue
 * @param  {Number} value    Value to check
 * @param  {Number} minValue Min value for value
 * @return {Boolean}         Result
 */
function min (value, minValue) {
  if (!isNumber(minValue)) {
    return false;
  }

  return value >= minValue;
}

module.exports = min;
