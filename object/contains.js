function contains (expectedValue) {
  return value => Object.values(value).indexOf(expectedValue) > -1;
}

module.exports = contains;
