const checkType = require('./helpers/checkType');

function validator () {
  const validators = Array.from(arguments);
  if (!validators.every(v => checkType(v, 'function'))) {
    throw new TypeError('validator: not every argument is a function');
  }

  return value => validators.reduce((valid, v) => valid && v(value), true);
}

module.exports = validator;
