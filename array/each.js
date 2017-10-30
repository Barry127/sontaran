const checkType = require('../helpers/checkType');

function each (validator) {
  if (!checkType(validator, 'function')) {
    throw new TypeError('each: validator argument is not a function');
  }

  return value => value.every(validator);
}

module.exports = each;
