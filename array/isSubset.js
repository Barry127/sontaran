const validArray = require('./isArray')();
const contains = require('./contains');

function isSubset (superset) {
  if (!validArray(superset)) {
    throw new TypeError('isSubset: superset argument is not an array');
  }

  return value => value.reduce((valid, elem) => {
    if (!valid) {
      return false;
    }

    return contains(elem)(superset);
  }, true);
}

module.exports = isSubset;
