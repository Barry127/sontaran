const isNumber = require('./isNumber');

/**
 * Check if value is not greater than maxValue
 * @param  {Number} value    Value to check
 * @param  {Number} maxValue Max value for value
 * @return {Boolean}         Result
 */
function max (value, maxValue) {
  if (!isNumber(maxValue)) {
    return false;
  }

  return value <= maxValue;
}

module.exports = max;
