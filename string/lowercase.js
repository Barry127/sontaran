const isString = require('./isString');

/**
 * Check if value only contains lowercase characters
 * @param  {String} value Value to check
 * @return {Boolean}      Result
 */
function lowercase (value) {
  if (!isString(value)) {
    return false;
  }

  return value.toLowerCase() === value;
}

module.exports = lowercase;
