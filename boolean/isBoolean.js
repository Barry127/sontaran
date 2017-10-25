const checkType = require('../helpers/checkType');

function isBoolean () {
  return value => checkType(value, 'boolean');
}

module.exports = isBoolean;
