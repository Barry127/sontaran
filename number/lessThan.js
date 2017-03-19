const isNumber = require('./isNumber');

/**
 * Check if value is less than lt (exclusive)
 * @param  {Number} value Value to check
 * @param  {Number} gt    Value should be less than gt
 * @return {Boolean}      Result
 */
function lessThan (value, lt) {
  if (!isNumber(lt)) {
    return false;
  }

  return value < lt;
}

module.exports = lessThan;
