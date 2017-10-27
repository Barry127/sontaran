const validString = require('./isString')();

function startsWith (expectedStart) {
  if (!validString(expectedStart)) {
    throw new TypeError('startsWith: expectedStart argument is not a string');
  }

  return value => value.startsWith(expectedStart);
}

module.exports = startsWith;
