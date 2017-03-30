const isString = require('./isString');

/**
 * Check if string ends with value
 * @param  {String} string String to check
 * @param  {String} value  Value string should end with
 * @return {Boolean}       Result
 */
function endsWith (string, value) {
  if (!isString(string) || !isString(value)) {
    return false;
  }

  return string.endsWith(value);
}

module.exports = endsWith;
