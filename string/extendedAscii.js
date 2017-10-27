const match = require('./match');
const extendedAsciiMatcher = match(/^[\x00-\xFF]*$/); // eslint-disable-line no-control-regex

function extendedAscii () {
  return value => extendedAsciiMatcher(value);
}

module.exports = extendedAscii;
