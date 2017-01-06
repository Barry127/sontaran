/* eslint no-new: "off" */
/* eslint no-control-regex: "off" */

const StringValidator   = require('./String');
const throwAwayDomains  = require('../data/throw-away-email-domains');

class EmailValidator extends StringValidator {

  constructor (value) {
    super(value);

    /* Regex from Philippe Verday his comment @ http://emailregex.com/ */
    const emailRegex = /^((?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+(?:\.(?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+)*|"(?:[^\\"]|\\.)+")@(?:\[(?:((?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|IPv6:((?:[0-9A-F]{1,4}:){7}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){6}:[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){5}:(?:[0-9A-F]{1,4}:)?[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){4}:(?:[0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){3}:(?:[0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){2}:(?:[0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4}|[0-9A-F]{1,4}::(?:[0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4}|::(?:[0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){1,7}:|(?:[0-9A-F]{1,4}:){6}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|(?:[0-9A-F]{1,4}:){0,5}:(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|::(?:[0-9A-F]{1,4}:){0,5}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|([-a-z\d]{0,62}[a-z\d]:[^[\\\]]+))]|([a-z\d](?:[-a-z\d]{0,62}[a-z\d])?(?:\.[a-z\d](?:[-a-z\d]{0,62}[a-z\d])?)+))$/i;

    if (!emailRegex.test(value)) {
      throw new Error(`${value} is an invalid email address`);
    }

    const domain = value.split('@').pop();
    const localPart = value.substring(0, value.length - domain.length - 1);

    this.email = {
      domain,
      localPart
    };
  }

  /**
   * Check if emails domain is domainName (case-insensitive)
   * @param  {String} domainName domain name to check for
   * @return {Object}            EmailValidator
   */
  domain (domainName) {
    new StringValidator(domainName);

    if (this.email.domain.toLowerCase() !== domainName.toLowerCase()) {
      throw new Error(`Expected domain of ${this.value} to equal ${domainName}`);
    }

    return this;
  }

  /**
   * Check if emails domain matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @return {Object}         EmailValidator
   */
  domainMatch (pattern) {
    this._checkRegExp(pattern);

    if (!pattern.test(this.email.domain)) {
      throw new Error(`Expected domain of ${this.value} to match pattern ${pattern.toString()}`);
    }

    return this;
  }

  matchDomain (pattern) {
    return this.domainMatch(pattern);
  }

  matchName (pattern) {
    return this.nameMatch(pattern);
  }

  /**
   * Checks if name (local-part) equals checkValue (case-sensitive)
   * @param  {[type]} checkValue [description]
   * @return {[type]}            [description]
   */
  name (checkValue) {
    new StringValidator(checkValue);

    if (this.email.localPart !== checkValue) {
      throw new Error(`Expected name (local-part) of ${this.value} to equal ${checkValue}`);
    }

    return this;
  }

  /**
   * Check if emails name (local part) matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @return {Object}         EmailValidator
   */
  nameMatch (pattern) {
    this._checkRegExp(pattern);

    if (!pattern.test(this.email.localPart)) {
      throw new Error(`Expected name (local-part) of ${this.value} to match pattern ${pattern.toString()}`);
    }

    return this;
  }

  /**
   * Check if email is not from a throw-away email service
   * @return {Object} EmailValidator
   */
  noThrowAway () {
    const subjects = this.email.domain.split('.').map((element, index) => { // eslint-disable-line
      return this.email.domain.split('.').slice(index).join('.'); // eslint-disable-line
    });

    if (subjects.some(domain => throwAwayDomains.indexOf(domain) > -1)) {
      throw new Error(`Expected ${this.value} not to be a throw away email account`);
    }

    return this;
  }

}

module.exports = EmailValidator;
