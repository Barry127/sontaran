const validString = require('./isString')();

function contains (expectedValue) {
  if (!validString(expectedValue)) {
    throw new TypeError('contains: expectedValue argument is not a string');
  }

  return value => value.indexOf(expectedValue) > -1;
}

module.exports = contains;
