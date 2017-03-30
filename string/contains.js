const isString = require('./isString');

/**
 * Check if string contains value
 * @param  {String} string String to check
 * @param  {String} value  Value string should contain
 * @return {Boolean}       Result
 */
function contains (string, value) {
  if (!isString(string) || !isString(value)) {
    return false;
  }

  return string.indexOf(value) > -1;
}

module.exports = contains;
