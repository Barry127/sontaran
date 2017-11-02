function hasOwnProperty (key) {
  return value => Object.prototype.hasOwnProperty.call(value, key);
}

module.exports = hasOwnProperty;
