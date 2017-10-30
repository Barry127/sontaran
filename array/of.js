const checkType = require('../helpers/checkType');
const validArray = require('./isArray')();
const validString = require('../string/isString')();

function _of (expectedType) {
  if (!validString(expectedType)) {
    throw new TypeError('of: expectedType argument is not a string');
  }

  return value => value.reduce((valid, elem) => {
    if (!valid) {
      return false;
    }

    switch (expectedType.toLowerCase()) {
      case 'array':
        return validArray(elem);

      case 'boolean':
      case 'function':
      case 'number':
      case 'object':
      case 'string':
        return checkType(elem, expectedType);

      default:
        return false;
    }
  }, true);
}

module.exports = _of;
