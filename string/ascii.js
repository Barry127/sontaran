const match = require('./match');
const asciiRegExp = /^[\x00-\x7F]*$/; // eslint-disable-line no-control-regex

/**
 * Check if value only contains ascii characters
 * @param  {String} value String to check
 * @return {Boolean}      Result
 */
function ascii (value) {
  return match(value, asciiRegExp);
}

module.exports = ascii;
