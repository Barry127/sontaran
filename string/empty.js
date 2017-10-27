const match = require('./match');
const emptyMatcher = match(/^[\s]*$/);

function empty () {
  return value => emptyMatcher(value);
}

module.exports = empty;
