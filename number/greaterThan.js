const validNumber = require('./isNumber')();

function greaterThan (gt) {
  if (!validNumber(gt)) {
    throw new TypeError('greaterThan: gt argument is not a valid number');
  }

  return value => value > gt;
}

module.exports = greaterThan;
