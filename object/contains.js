const getOwnProperties = require('../helpers/getOwnProperties');

/**
 * Check if object contains value value
 * @param  {Object} object Object to check
 * @param  {Mixed}  value  Value object should contain
 * @return {Boolean}       Result
 */
function contains (object, value) {
  return getOwnProperties(object)
    .reduce((found, key) => {
      if (found) {
        return true;
      }

      return object[key] === value;
    }, false);
}

module.exports = contains;
