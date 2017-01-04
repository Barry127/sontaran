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
   * Check if value is empty string
   * @return {Object} StringValidator
   */
  empty () {
    if (this.value.length > 0) {
      throw new Error(`Expected ${this.value} to be an empty string`);
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

  enum (list) {
    return this.oneOf(list);
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
   * Check if value is a hexcolor
   * @return {Object} StringValidator
   */
  hexColor () {
    const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

    if (!hexRegex.test(this.value)) {
      throw new Error(`Expected ${this.value} to be a hex color`);
    }

    return this;
  }

  /**
   * Check if value is JSON
   * @return {Object} StringValidator
   */
  JSON () {
    const jsonError = `Expected ${this.value} to be valid JSON`;

    try {
      const data = JSON.parse(this.value);

      if (typeof data !== 'object') {
        throw new Error(jsonError);
      }
    } catch (e) {
      throw new Error(jsonError);
    }

    return this;
  }

  json () {
    return this.JSON(); // eslint-disable-line
  }

  /**
   * Check if length of value is exactly length
   * @param  {Number} length length the value should be
   * @return {Object}        StringValidator
   */
  length (length) {
    new NumberValidator(length).integer();

    if (this.value.length !== length) {
      throw new Error(`Expected length of ${this.value} to be exactly ${length}`);
    }

    return this;
  }

  /**
   * Check if value is lowercase
   * @return {Object} StringValidator
   */
  lowercase () {
    if (this.value.toLowerCase() !== this.value) {
      throw new Error(`Expected ${this.value} to be lowercase`);
    }

    return this;
  }

  lowerCase () {
    return this.lowercase();
  }

  /**
   * Check if string matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @return {Object}         StringValidator
   */
  match (pattern) {
    if (!(pattern instanceof RegExp)) {
      throw new TypeError('Expected pattern to be of type RegExp');
    }

    if (!pattern.test(this.value)) {
      throw new Error(`Expected ${this.value} to match pattern ${pattern.toString()}`);
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
   * Check if value is one of the items in list
   * @param  {Array}  list  List of possible values for value
   * @return {Object}       StringValidator
   */
  oneOf (list) {
    if (!Array.isArray(list)) {
      const type = typeof list;

      throw new TypeError(`Expected ${type} list to be an Array`);
    }

    list.forEach((element) => {
      this._checkType.call({ value: element }, 'string');
    });

    if (list.indexOf(this.value) === -1) {
      throw new Error(`Expected ${this.value} to be one of [${list.toString()}]`);
    }

    return this;
  }

  regExp (pattern) {
    return this.match(pattern);
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

  /**
   * Check if value is uppercase
   * @return {Object} StringValidator
   */
  uppercase () {
    if (this.value.toUpperCase() !== this.value) {
      throw new Error(`Expected ${this.value} to be uppercase`);
    }

    return this;
  }

  upperCase () {
    return this.uppercase();
  }

}

module.exports = StringValidator;
