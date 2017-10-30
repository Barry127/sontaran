const validString = require('../string/isString')();

function name (expectedName) {
  if (!validString(expectedName) && !(expectedName instanceof RegExp)) {
    throw new TypeError('name: expectedName argument is not a string or an instance of RegExp');
  }

  return value => {
    const localPart = value.split('@')[0];

    return validString(expectedName) ?
      localPart === expectedName :
      expectedName.test(localPart);
  };
}

module.exports = name;
