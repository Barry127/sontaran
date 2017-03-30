const isArray = require('../array/isArray');
const isObject = require('../object/isObject');

/**
 * Check if value is valid JSON
 * @param  {String}  value Value to check
 * @return {Boolean}       Result
 */
function isJson (value) {
  try {
    const data = JSON.parse(value);

    if (!isArray(data) && !isObject(data)) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

module.exports = isJson;
