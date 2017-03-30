const match = require('./match');
const hexRegExp = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

/**
 * Check if value is a valid hex color
 * @param  {String} value Value that should be a hexcolor
 * @return {Boolean}      Result
 */
function hexColor (value) {
  return match(value, hexRegExp);
}

module.exports = hexColor;
