const isEmpty = require('./empty')();

function notEmpty () {
  return value => !isEmpty(value);
}

module.exports = notEmpty;
