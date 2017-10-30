const validArray = require('./isArray')();
const isSubset = require('./isSubset');

function isSuperset (subset) {
  if (!validArray(subset)) {
    throw new TypeError('isSuperset: subset argument is not an array');
  }

  return value => isSubset(value)(subset);
}

module.exports = isSuperset;
