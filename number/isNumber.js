const checkType = require('../helpers/checkType');

function isNumber () {
  return value => checkType(value, 'number');
}

module.exports = isNumber;
