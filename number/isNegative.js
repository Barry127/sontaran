const isNumber = require('./isNumber');

/**
 * Check if value is a negative number
 * @param  {Number}  value Value to check
 * @return {Boolean}       Result
 */
function isNegative (value) {
  if (!isNumber(value)) {
    return false;
  }

  return value < 0;
}

module.exports = isNegative;
