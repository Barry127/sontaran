const isNumber = require('./isNumber');

/**
 * Check if value is a positive number
 * @param  {Number}  value Value to check
 * @return {Boolean}       Result
 */
function isPositive (value) {
  if (!isNumber(value)) {
    return false;
  }

  return value > 0;
}

module.exports = isPositive;
