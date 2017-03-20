const isObject = require('./isObject');

/**
 * Check if object has own property key
 * @param  {Object}  object Object to check
 * @param  {Mixed}   key    Key object should have
 * @return {Boolean}        Result
 */
function hasOwnProperty (object, key) {
  if (!isObject(object)) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(object, key);
}

module.exports = hasOwnProperty;
