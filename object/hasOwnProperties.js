const validArray = require('../array/isArray')();
const hasOwnProperty = require('./hasOwnProperty');

function hasOwnProperties (expectedKeys) {
  if (!validArray(expectedKeys)) {
    throw new TypeError('hasOwnProperties: expectedKeys argument is not an array');
  }

  return value => expectedKeys.every(key => hasOwnProperty(key)(value));
}

module.exports = hasOwnProperties;
