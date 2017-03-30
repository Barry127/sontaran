const isString = require('./isString');
const empty = require('./empty');

/**
 * Check if value is not empty
 * @param  {String} value Value that should not be empty
 * @return {Boolean}      Result
 */
function notEmpty (value) {
  if (!isString(value)) {
    return false;
  }

  return !empty(value);
}

module.exports = notEmpty;
