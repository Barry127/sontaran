const isNumber = require('./isNumber');

/**
 * Check if value is between min and max (both exclusive)
 * @param  {Number} value Value to check
 * @param  {Number} min   Value must be greater than min
 * @param  {Number} max   Value must be less than max
 * @return {Boolean}      Result
 */
function between (value, min, max) {
  if (!isNumber(min) || !isNumber(max)) {
    return false;
  }

  return value > min && value < max;
}

module.exports = between;
