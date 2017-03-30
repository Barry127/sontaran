const match = require('./match');

const base64RegExp = /^[A-Za-z0-9+/=]*$/;

/**
 * Check if value is a valid base64 encoded string
 * @param  {String} value String to check
 * @return {Boolean}      Result
 */
function base64 (value) {
  if (!match(value, base64RegExp)) {
    return false;
  }

  if (value.length % 4 !== 0) {
    return false;
  }

  const firstEqual = value.indexOf('=');

  if (firstEqual > -1 && firstEqual < value.length - 2) {
    return false;
  }

  if (firstEqual === value.length - 2 && !value.endsWith('=')) {
    return false;
  }

  return true;
}

module.exports = base64;
