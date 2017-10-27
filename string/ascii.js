const match = require('./match');
const asciiMatcher = match(/^[\x00-\x7F]*$/); // eslint-disable-line no-control-regex

function ascii () {
  return value => asciiMatcher(value);
}

module.exports = ascii;
