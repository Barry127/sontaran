const checkType = require('../helpers/checkType');

function isString () {
  return value => checkType(value, 'string');
}

module.exports = isString;
