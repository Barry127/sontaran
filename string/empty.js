const match = require('./match');

const emptyRegExp = /^[\s]*$/;

/**
 * Check if value is empty
 * @param  {String} value String that should be empty
 * @return {Boolean}      Result
 */
function empty (value) {
  return match(value, emptyRegExp);
}

module.exports = empty;
