const isString = require('../string/isString');
const max = require('../number/max');
const min = require('../number/min');
const notNaN = require('../number/notNaN');

/**
 * Check if value is a valid decimal IPv4 notation
 * @param  {String} value value to check
 * @return {Boolean}      result
 */
function ipv4 (value) {
  if (!isString(value)) {
    return false;
  }

  const parts = value.split('.');

  if (parts.length !== 4) {
    return false;
  }

  return parts.reduce((valid, part) => {
    if (!valid) {
      return false;
    }

    if (part.length > 1 && part.startsWith('0')) {
      return false;
    }

    const numericValue = parseInt(part, 10);

    if (!notNaN(numericValue) || !min(numericValue, 0) || !max(numericValue, 255)) {
      return false;
    }

    return true;
  }, true);
}

module.exports = ipv4;
