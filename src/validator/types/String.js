/* eslint no-new: "off" */
/* eslint no-control-regex: "off" */

const BaseValidator     = require('./Base');
const BooleanValidator  = require('./Boolean');
const NumberValidator   = require('./Number');

class StringValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('string');
  }

  /**
   * Check if value only contains ascii characters
   * @return {Object}           StringValidator
   */
  ascii () {
    const asciiRegex = /^[\x00-\x7F]*$/;

    if (!asciiRegex.test(this.value)) {
      throw new Error(`Expected ${this.value} to only contain ascii values`);
    }

    return this;
  }

  /**
   * Check if value is a valid base64 encoded string
   * @return {Object} StringValidator
   */
  base64 () {
    const base64Regex = /^[A-Za-z0-9+/=]*$/;
    const base64Error = `Expected ${this.value} to be a valid base64 encoded string`;

    if (!base64Regex.test(this.value) || this.value.length % 4 !== 0) {
      throw new Error(base64Error);
    }

    const firstEql = this.value.indexOf('=');

    if (firstEql > -1) {
      if (firstEql < this.value.length - 2) {
        throw new Error(base64Error);
      }
      if (firstEql === this.value.length - 2 && this.value.substr(this.value.length - 1, 1) !== '=') {
        throw new Error(base64Error);
      }
    }

    return this;
  }

  /**
   * Check if length of value is between minLength and maxLength (inclusive)
   * @param  {Number}  minLength minimum length for value
   * @param  {Number}  maxLength maximum length for value
   * @return {Object}            StringValidator
   */
  between (minLength, maxLength) {
    new NumberValidator(minLength).integer();
    new NumberValidator(maxLength).integer();

    return this.min(minLength).max(maxLength);
  }

  /**
   * Check if value contains query
   * @param  {String}  query         value the value should contain
   * @param  {Boolean} caseSensitive should the comparison be case sensitive
   * @return {Object}                StringValidator
   */
  contains (query, caseSensitive = true) {
    new StringValidator(query);
    new BooleanValidator(caseSensitive);

    if (caseSensitive) {
      if (this.value.indexOf(query) === -1) {
        throw new Error(`Expected ${this.value} to contain ${query}`);
      }

    /* Case insensitive: */
    } else if (this.value.toLowerCase().indexOf(query.toLowerCase()) === -1) {
      throw new Error(`Expected ${this.value} to (case insensitive) contain ${query}`);
    }

    return this;
  }

  /**
   * Check if value ends with CheckValue
   * @param  {[type]}  query         value to check for
   * @param  {Boolean} caseSensitive should the check be case sensitive
   * @return {Object}                StringValidator
   */
  endsWith (query, caseSensitive = true) {
    new StringValidator(query);
    new BooleanValidator(caseSensitive);

    const position = this.value.length - query.length;

    if (caseSensitive) {
      const lastIndex = this.value.lastIndexOf(query, position);

      if (lastIndex === -1 || lastIndex !== position) {
        throw new Error(`Expected ${this.value} to end with ${query}`);
      }

    /* Case insensitive: */
    } else {
      const lastIndex = this.value.toLowerCase().lastIndexOf(query.toLowerCase(), position);

      if (lastIndex === -1 || lastIndex !== position) {
        throw new Error(`Expected ${this.value} to (case insensitive) end with ${query}`);
      }
    }

    return this;
  }

  /**
   * Check if value equals checkValue
   * @param  {String}  checkValue    value to equal to
   * @param  {Boolean} caseSensitive should the comparison be case sensitive
   * @return {Object}                StringValidator
   */
  equals (checkValue, caseSensitive = true) {
    new StringValidator(checkValue);
    new BooleanValidator(caseSensitive);

    if (caseSensitive) {
      if (this.value !== checkValue) {
        throw new Error(`Expected ${this.value} to equal ${checkValue}`);
      }

    /* Case insensitive: */
    } else if (this.value.toLowerCase() !== checkValue.toLowerCase()) {
      throw new Error(`Expected ${this.value} to (case insensitive) equal ${checkValue}`);
    }

    return this;
  }

  /**
   * Check if value only contains extended ascii characters
   * @return {Object}           StringValidator
   */
  extendedAscii () {
    const extendedAsciiRegex = /^[\x00-\xFF]*$/;

    if (!extendedAsciiRegex.test(this.value)) {
      throw new Error(`Expected ${this.value} to only contain extended ascii values`);
    }

    return this;
  }

  /**
   * Check if length of value is not greater than maxLength
   * @param  {Number} maxLength maximum length for value
   * @return {Object}           StringValidator
   */
  max (maxLength) {
    new NumberValidator(maxLength).integer();

    if (this.value.length > maxLength) {
      throw new Error(`Expected length of ${this.value} to be at most ${maxLength}`);
    }

    return this;
  }

  /**
   * Check if length of value is not less than minLength
   * @param  {Number} minLength minimum length for value
   * @return {Object}           StringValidator
   */
  min (minLength) {
    new NumberValidator(minLength).integer();

    if (this.value.length < minLength) {
      throw new Error(`Expected length of ${this.value} to be at least ${minLength}`);
    }

    return this;
  }

  /**
   * Check if value starts with query
   * @param  {[type]}  query         value to check for
   * @param  {Boolean} caseSensitive should the check be case sensitive
   * @return {Object}                StringValidator
   */
  startsWith (query, caseSensitive = true) {
    new StringValidator(query);
    new BooleanValidator(caseSensitive);

    const start = this.value.substr(0, query.length);

    if (caseSensitive) {
      if (start !== query) {
        throw new Error(`Expected ${this.value} to start with ${query}`);
      }

    /* Case insensitive: */
    } else if (start.toLowerCase() !== query.toLowerCase()) {
      throw new Error(`Expected ${this.value} to (case insensitive) start with ${query}`);
    }

    return this;
  }

}

module.exports = StringValidator;
