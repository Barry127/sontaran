const checkType = require('../helpers/checkType');

/**
 * Check if email has string name of matches RegExp name
 * @param  {String}        email  Email to check name part for
 * @param  {String|RegExp} name   String for name part or RegExp name should match
 * @return {Boolean}              Result
 */
function name (email, name) {
  if (!checkType(email, 'string')) {
    return false;
  }

  const localPart = email.split('@')[0];

  if (typeof name === 'string') {
    return localPart === name;
  }

  if (checkType(name, 'object') && name instanceof RegExp) {
    return name.test(localPart);
  }

  return false;
}

module.exports = name;
