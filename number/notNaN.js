const isNaN = require('./isNaN');

/**
 * Check if value is not NaN
 * @param  {Number}  value Value to check
 * @return {Boolean}       Result
 */
function notNaN (value) {
  return !isNaN(value);
}

module.exports = notNaN;
