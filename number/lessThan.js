const validNumber = require('./isNumber')();

function lessThan (lt) {
  if (!validNumber(lt)) {
    throw new TypeError('lessThan: lt argument is not a valid number');
  }

  return value => value < lt;
}

module.exports = lessThan;
