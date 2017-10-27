const checkType = require('../helpers/checkType');

function isObject () {
  return value => value !== null && checkType(value, 'object');
}

module.exports = isObject;
