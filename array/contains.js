const isArray = require('./isArray');

/**
 * Check if array contains value
 * @param  {Array}  array Array to check
 * @param  {Mixed}  value Value array should contain
 * @return {Boolean}      Result
 */
function contains (array, value) {
  if (!isArray(array)) {
    return false;
  }

  return array.indexOf(value) > -1;
}

module.exports = contains;
