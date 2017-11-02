const validObject = require('./isObject')();

function isSubset (superSet) {
  if (!validObject(superSet)) {
    throw new TypeError('isSubset: superSet argument is not an object');
  }

  return value => Object.keys(value).reduce((valid, key) => {
    if (!valid) {
      return false;
    }

    return value[key] === superSet[key];
  }, true);
}

module.exports = isSubset;
