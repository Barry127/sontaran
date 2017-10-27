const match = require('./match');
const hexColorMatcher = match(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i);

function hexColor () {
  return value => hexColorMatcher(value);
}

module.exports = hexColor;
