const isString = require('./isString');
const isObject = require('../object/isObject');
/**
 * Check if value matches RegExp pattern
 * @param  {String} value   String to check
 * @param  {RegExp} pattern RegExp value should match
 * @return {Boolean}        Result
 */
function match (value, pattern) {
  if (!isString(value)) {
    return false;
  }

  if (!isObject(pattern) || !(pattern instanceof RegExp)) {
    return false;
  }

  return pattern.test(value);
}

module.exports = match;
