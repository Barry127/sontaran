function checkType (value, type) {
  if (typeof type !== 'string') {
    throw new TypeError('checkType: type argument must be of type string');
  }

  return (typeof value === type.toLowerCase()); // eslint-disable-line valid-typeof
}

module.exports = checkType;
