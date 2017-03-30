const isString = require('./isString');

/**
 * Check if value only contains uppercase characters
 * @param  {String} value Value to check
 * @return {Boolean}      Result
 */
function uppercase (value) {
  if (!isString(value)) {
    return false;
  }

  return value.toUpperCase() === value;
}

module.exports = uppercase;
