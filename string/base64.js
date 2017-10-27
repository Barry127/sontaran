const match = require('./match');
const base64Matcher = match(/^[A-Za-z0-9+/=]*$/);

function base64 () {
  return value => {
    if (!base64Matcher(value)) {
      return false;
    }

    if (value.length % 4 !== 0) {
      return false;
    }

    const firstEqual = value.indexOf('=');

    if (firstEqual > -1 && firstEqual < value.length - 2) {
      return false;
    }

    if (firstEqual === value.length - 2 && !value.endsWith('=')) {
      return false;
    }

    return true;
  };
}

module.exports = base64;
