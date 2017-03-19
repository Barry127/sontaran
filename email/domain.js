const checkType = require('../helpers/checkType');

/**
 * Check if email has string domain or matches RegExp domain
 * @param  {String}        email  Email to check domain for
 * @param  {String|RegExp} domain String for domain or RegExp domain should match
 * @return {Boolean}              Result
 */
function domain (email, domain) {
  if (!checkType(email, 'string')) {
    return false;
  }

  const emailDomain = email.split('@')[1];

  if (checkType(domain, 'string')) {
    return emailDomain.toLowerCase() === domain.toLowerCase();
  }

  if (checkType(domain, 'object') && domain instanceof RegExp) {
    return domain.test(emailDomain);
  }

  return false;
}

module.exports = domain;
