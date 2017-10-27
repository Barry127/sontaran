function contains (expectedValue) {
  return value => value.indexOf(expectedValue) > -1;
}

module.exports = contains;
