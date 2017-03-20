const checkType = require('../helpers/checkType');
const isArray = require('./isArray');
const isString = require('../string/isString');

/**
 * Check if array is of type type
 * @param  {Array}  array Array to check
 * @param  {String} type  Type all elements of array should be
 * @return {Boolean}      Result
 */
function _of (array, type) {
  if (!isArray(array)) {
    return false;
  }

  if (!isString(type)) {
    return false;
  }

  type = type.toLowerCase();

  return array.reduce((valid, element) => {
    if (!valid) {
      return false;
    }

    switch (type) {
      case 'array':
        return isArray(element);

      case 'boolean':
      case 'function':
      case 'number':
      case 'object':
      case 'string':
        return checkType(element, type);

      default:
        return false;
    }
  }, true);
}

module.exports = _of;
