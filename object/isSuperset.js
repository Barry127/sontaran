const validObject = require('./isObject')();
const isSubset = require('./isSubset');

function isSuperset (subset) {
  if (!validObject(subset)) {
    throw new TypeError('isSuperset: subset argument is not an object');
  }

  return value => isSubset(value)(subset);
}

module.exports = isSuperset;
