const max255 = require('../number/max')(255);
const min0 = require('../number/min')(0);
const notNaN = require('../number/notNaN');

function ipv4 () {
  return value => {
    const parts = value.split('.');

    if (parts.length !== 4) {
      return false;
    }

    return parts.reduce((valid, part) => {
      if (!valid) {
        return false;
      }

      if (part.length > 1 && part.startsWith('0')) {
        return false;
      }

      const numericValue = parseInt(part, 10);

      if (!notNaN(numericValue) || !min0(numericValue) || !max255(numericValue)) {
        return false;
      }

      return true;
    }, true);
  };
}

module.exports = ipv4;
