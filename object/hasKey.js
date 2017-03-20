const hasOwnProperty = require('./hasOwnProperty');

/**
 * Check if object has key (own property) key
 * @param  {Object}  object Object to check
 * @param  {Mixed}   key    Key object should have
 * @return {Boolean}        Result
 */
function hasKey (object, key) {
  return hasOwnProperty(object, key);
}

module.exports = hasKey;
