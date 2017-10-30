const validString = require('../string/isString')();

function domain (expectedDomain) {
  if (!validString(expectedDomain) && !(expectedDomain instanceof RegExp)) {
    throw new TypeError('domain: expectedDomain argument is not a string or an instance of RegExp');
  }

  return value => {
    const emailDomain = value.split('@')[1];

    return validString(expectedDomain) ?
      emailDomain.toLowerCase() === expectedDomain.toLowerCase() :
      expectedDomain.test(emailDomain);
  };
}

module.exports = domain;
