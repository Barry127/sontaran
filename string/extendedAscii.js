const match = require('./match');
const extendedAsciiRegExp = /^[\x00-\xFF]*$/; // eslint-disable-line no-control-regex

/**
 * Check if value only contains extended ascii characters
 * @param  {String} value String to check
 * @return {Boolean}      Result
 */
function extendedAscii (value) {
  return match(value, extendedAsciiRegExp);
}

module.exports = extendedAscii;
