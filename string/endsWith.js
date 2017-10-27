const validString = require('./isString')();

function endsWith (expectedEnd) {
  if (!validString(expectedEnd)) {
    throw new TypeError('endsWith: expectedEnd argument is not a string');
  }

  return value => value.endsWith(expectedEnd);
}

module.exports = endsWith;
