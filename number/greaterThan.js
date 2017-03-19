const isNumber = require('./isNumber');

/**
 * Check if value is greater than gt (exclusive)
 * @param  {Number} value Value to check
 * @param  {Number} gt    Value should be greater than gt
 * @return {Boolean}      Result
 */
function greaterThan (value, gt) {
  if (!isNumber(gt)) {
    return false;
  }

  return value > gt;
}

module.exports = greaterThan;
