const isObject = require('../object/isObject');
const hasOwnProperty = require('../object/hasOwnProperty');

/**
 * Get an array of all own properties of object
 * @param  {Object} object Object to get properties from
 * @return {Array}         List of objects properties
 */
function getOwnProperties (object) {
  if (!isObject(object)) {
    return [];
  }

  const properties = [];

  for (const property in object) {
    if (hasOwnProperty(object, property)) {
      properties.push(property);
    }
  }

  return properties;
}

module.exports = getOwnProperties;
