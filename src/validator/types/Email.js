const RegexpValidator   = require('./RegExp');
const StringValidator   = require('./String');
const throwAwayDomains  = require('../data/throw-away-email-domains');

function testPart (part, pattern, method) {
  new RegexpValidator(pattern).throw(`EmailValidator.${method}: pattern is not an instance of RegExp`);

  return pattern.test(part);
}

class EmailValidator extends StringValidator {

  constructor (value) {
    super(value);

    /* Regex from Philippe Verday his comment @ http://emailregex.com/ */
    // eslint-disable-next-line max-len
    const emailRegex = /^((?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+(?:\.(?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+)*|"(?:[^\\"]|\\.)+")@(?:\[(?:((?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|IPv6:((?:[0-9A-F]{1,4}:){7}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){6}:[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){5}:(?:[0-9A-F]{1,4}:)?[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){4}:(?:[0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){3}:(?:[0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){2}:(?:[0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4}|[0-9A-F]{1,4}::(?:[0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4}|::(?:[0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){1,7}:|(?:[0-9A-F]{1,4}:){6}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|(?:[0-9A-F]{1,4}:){0,5}:(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|::(?:[0-9A-F]{1,4}:){0,5}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|([-a-z\d]{0,62}[a-z\d]:[^[\\\]]+))]|([a-z\d](?:[-a-z\d]{0,62}[a-z\d])?(?:\.[a-z\d](?:[-a-z\d]{0,62}[a-z\d])?)+))$/i;

    this.match(emailRegex, {
      type: 'email',
      expected: 'email',
      messsage: `${value} is an invalid email address`
    });

    const domain = this.valid() ? value.split('@').pop() : '';
    const localPart = this.valid() ? value.substring(0, value.length - domain.length - 1) : '';

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
    new StringValidator(domainName).throw('EmailValidator.domain: domainName is not of type string');

    if (this.email.domain.toLowerCase() !== domainName.toLowerCase()) {
      this._addError('domain', domainName, this.email.domain, `Expected domain of ${this.value} to equal ${domainName}`);
    }

    return this;
  }


  domainMatch (pattern) {
    return this.matchDomain(pattern);
  }

  /**
   * Check if emails domain matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @return {Object}         EmailValidator
   */
  matchDomain (pattern) {
    if (!testPart(this.email.domain, pattern, 'matchDomain')) {
      return this._addError('matchDomain', pattern.toString(), this.email.domain, `Expected domain of ${this.value} to match pattern ${pattern.toString()}`);
    }

    return this;
  }

  /**
   * Check if emails name (local part) matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @return {Object}         EmailValidator
   */
  matchName (pattern) {
    if (!testPart(this.email.localPart, pattern, 'matchName')) {
      return this._addError('matchName', pattern.toString(), this.email.localPart, `Expected name (local-part) of ${this.value} to match pattern ${pattern.toString()}`);
    }

    return this;
  }

  /**
   * Checks if name (local-part) equals query (case-sensitive)
   * @param  {String} query [description]
   * @return {Object}        [description]
   */
  name (query) {
    new StringValidator(query).throw('EmailValidator.name: query is not of type string');

    if (this.email.localPart !== query) {
      return this._addError('name', query, this.email.localPart, `Expected name (local-part) of ${this.value} to equal ${query}`);
    }

    return this;
  }


  nameMatch (pattern) {
    return this.matchName(pattern);
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
      return this._addError('noThrowAway', 'valid email', this.value, `Expected ${this.value} not to be a throw away email account`);
    }

    return this;
  }

}

module.exports = EmailValidator;
