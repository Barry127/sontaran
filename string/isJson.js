const validArray = require('../array/isArray')();
const validObject = require('../object/isObject')();

function isJson () {
  return value => {
    try {
      const data = JSON.parse(value);

      if (!validArray(data) && !validObject(data)) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  };
}

module.exports = isJson;
