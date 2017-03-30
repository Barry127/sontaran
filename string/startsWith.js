const isString = require('./isString');

/**
 * Check if string starts with value
 * @param  {String} string String to check
 * @param  {String} value  Value string should start with
 * @return {Boolean}       Result
 */
function startsWith (string, value) {
  if (!isString(string) || !isString(value)) {
    return false;
  }

  return string.startsWith(value);
}

module.exports = startsWith;
