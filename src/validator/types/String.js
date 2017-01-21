/* eslint no-control-regex: "off" */

const BaseValidator     = require('./Base');
const BooleanValidator  = require('./Boolean');
const NumberValidator   = require('./Number');
const RegExpValidator   = require('./RegExp');

class StringValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('string');

    if (this.valid()) {
      this.props = {
        length: value.length,
        lowercase: value.toLowerCase(),
        uppercase: value.toUpperCase()
      };
    } else {
      this.value = '';
      this.props = {
        length: 0,
        lowercase: '',
        uppercase: ''
      };
    }
  }

  /**
   * Check if value only contains ascii characters
   * @return {Object}           StringValidator
   */
  ascii () {
    const asciiRegex = /^[\x00-\x7F]*$/;

    return this.match(asciiRegex, {
      type: 'ascii',
      message: `Expected ${this.value} to only contain ascii values`
    });
  }

  /**
   * Check if value is a valid base64 encoded string
   * @return {Object} StringValidator
   */
  base64 () {
    const base64Regex = /^[A-Za-z0-9+/=]*$/;
    const base64Error = {
      type: 'base64',
      expected: base64Regex.toString(),
      actual: this.value,
      message: `Expected ${this.value} to be a valid base64 encoded string`
    };

    if (!base64Regex.test(this.value) || this.value.length % 4 !== 0) {
      return this._addError(base64Error);
    }

    const firstEql = this.value.indexOf('=');

    if (firstEql > -1) {
      if (firstEql < this.value.length - 2) {
        return this._addError(base64Error);
      }
      if (firstEql === this.value.length - 2 && this.value.substr(this.value.length - 1, 1) !== '=') {
        return this._addError(base64Error);
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
    return this.min(minLength).max(maxLength);
  }

  /**
   * Check if value contains query
   * @param  {String}  query         value the value should contain
   * @param  {Boolean} caseSensitive should the comparison be case sensitive
   * @return {Object}                StringValidator
   */
  contains (query, caseSensitive = true) {
    new StringValidator(query).throw('StringValidator.contains: query is not of type string');
    new BooleanValidator(caseSensitive).throw('StringValidator.contains: caseSensitive is not of type boolean');

    if (caseSensitive) {
      if (this.value.indexOf(query) === -1) {
        return this._addError('contains', query, this.value, `Expected ${this.value} to contain ${query}`);
      }

    /* Case insensitive: */
    } else if (this.props.lowercase.indexOf(query.toLowerCase()) === -1) {
      return this._addError('contains (case insensitive)', query, this.value, `Expected ${this.value} to (case insensitive) contain ${query}`);
    }

    return this;
  }

  /**
   * Check if value is empty string
   * @return {Object} StringValidator
   */
  empty () {
    return this.match(/^[\s]*$/, {
      type: 'empty',
      expected: '',
      message: `Expected ${this.value} to be an empty string`
    });
  }

  /**
   * Check if value ends with CheckValue
   * @param  {[type]}  query         value to check for
   * @param  {Boolean} caseSensitive should the check be case sensitive
   * @return {Object}                StringValidator
   */
  endsWith (query, caseSensitive = true) {
    new StringValidator(query).throw('StringValidator.endsWith: query is not of type string');
    new BooleanValidator(caseSensitive).throw('StringValidator.endsWith: caseSensitive is not of type boolean');

    const position = this.value.length - query.length;
    const valuesEnd = this.value.substr(position - 1);

    if (caseSensitive) {
      const lastIndex = this.value.lastIndexOf(query, position);

      if (lastIndex === -1 || lastIndex !== position) {
        return this._addError('endsWith', query, valuesEnd, `Expected ${this.value} to end with ${query}`);
      }

    /* Case insensitive: */
    } else {
      const lastIndex = this.value.toLowerCase().lastIndexOf(query.toLowerCase(), position);

      if (lastIndex === -1 || lastIndex !== position) {
        return this._addError('endsWith (case insensitive)', query, valuesEnd, `Expected ${this.value} to (case insensitive) end with ${query}`);
      }
    }

    return this;
  }

  enum (list) {
    return this.oneOf(list);
  }

  /**
   * Check if value equals query
   * @param  {String}  query         value to equal to
   * @param  {Boolean} caseSensitive should the comparison be case sensitive
   * @return {Object}                StringValidator
   */
  equals (query, caseSensitive = true) {
    new StringValidator(query).throw('StringValidator.equals: query is not of type string');
    new BooleanValidator(caseSensitive).throw('StringValidator.equals: caseSensitive is not of type boolean');

    if (caseSensitive) {
      if (this.value !== query) {
        return this._addError('equals', query, this.value, `Expected ${this.value} to equal ${query}`);
      }

    /* Case insensitive: */
    } else if (this.props.lowercase !== query.toLowerCase()) {
      return this._addError('equals (case insensitive)', query, this.value, `Expected ${this.value} to (case insensitive) equal ${query}`);
    }

    return this;
  }

  /**
   * Check if value only contains extended ascii characters
   * @return {Object}           StringValidator
   */
  extendedAscii () {
    const extendedAsciiRegex = /^[\x00-\xFF]*$/;

    return this.match(extendedAsciiRegex, {
      type: 'extendedAscii',
      message: `Expected ${this.value} to only contain extended ascii values`
    });
  }

  /**
   * Check if value is a hexcolor
   * @return {Object} StringValidator
   */
  hexColor () {
    const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

    return this.match(hexRegex, {
      type: 'hexColor',
      message: `Expected ${this.value} to be a hex color`
    });
  }

  /**
   * Check if value is JSON
   * @return {Object} StringValidator
   */
  JSON () {
    const jsonError = {
      type: 'JSON',
      expected: 'valid JSON',
      actual: this.value,
      message: `Expected ${this.value} to be valid JSON`
    };

    try {
      const data = JSON.parse(this.value);

      if (typeof data !== 'object') {
        return this._addError(jsonError);
      }
    } catch (e) {
      return this._addError(jsonError);
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
    new NumberValidator(length).integer().throw('StringValidator.length: length is not a valid integer');

    if (this.props.length !== length) {
      return this._addError('length', length, this.props.length, `Expected length of ${this.value} to be exactly ${length}`);
    }

    return this;
  }

  lowerCase () {
    return this.lowercase();
  }

  /**
   * Check if value is lowercase
   * @return {Object} StringValidator
   */
  lowercase () {
    if (this.props.lowercase !== this.value) {
      this._addError('lowercase', this.props.lowercase, this.value, `Expected ${this.value} to be lowercase`);
    }

    return this;
  }

  /**
   * Check if string matches regular expression pattern
   * @param  {Object} pattern RegExp
   * @param  {Object} _error  Custom error for internal usage
   * @return {Object}         StringValidator
   */
  match (pattern, _error = {}) {
    new RegExpValidator(pattern).throw('StringValidator.match: pattern is not an instance of RegExp');

    const defaultError = {
      type: 'match',
      expected: pattern.toString(),
      actual: this.value,
      message: `Expected ${this.value} to match pattern ${pattern.toString()}`
    };

    const error = Object.assign({}, defaultError, _error);

    if (!pattern.test(this.value)) {
      return this._addError(error);
    }

    return this;
    // this._checkRegExp(pattern);

    // if (!pattern.test(this.value)) {
    //   throw new Error(`Expected ${this.value} to match pattern ${pattern.toString()}`);
    // }

    // return this;
  }

  /**
   * Check if length of value is not greater than maxLength
   * @param  {Number} maxLength maximum length for value
   * @return {Object}           StringValidator
   */
  max (maxLength) {
    new NumberValidator(maxLength).integer().throw('StringValidator.max: maxLength is not a valid integer');

    if (this.props.length > maxLength) {
      this._addError('max', maxLength, this.props.length, `Expected length of ${this.value} to be at most ${maxLength}`);
    }

    return this;
  }

  /**
   * Check if length of value is not less than minLength
   * @param  {Number} minLength minimum length for value
   * @return {Object}           StringValidator
   */
  min (minLength) {
    new NumberValidator(minLength).integer().throw('StringValidator.min: minLength is not a valid integer');

    if (this.props.length < minLength) {
      this._addError('min', minLength, this.props.length, `Expected length of ${this.value} to be at least ${minLength}`);
    }

    return this;
  }

  /**
   * Check if value is not empty (no empty string or whitespaces)
   * @return {Object} StringValidator
   */
  notEmpty () {
    const emptyRegex = /^[\s]*$/;

    if (emptyRegex.test(this.value)) {
      return this._addError('notEmpty', emptyRegex.toString(), this.value, `Expected ${this.value} to be not empty`);
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
      throw new Error('StringValidator.oneOf: list is not an Array');
    }

    list.forEach((element, index) => {
      new StringValidator(element).throw(`StringValidator.oneOf: list item ${index} with value ${element} is not of type string`);
    });

    if (list.indexOf(this.value) === -1) {
      return this._addError('oneOf', `[${list.toString()}]`, this.value, `Expected ${this.value} to be one of [${list.toString()}]`);
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
    new StringValidator(query).throw('StringValidator.startsWith: query is not of type string');
    new BooleanValidator(caseSensitive).throw('StringValidator.startsWith: caseSensitive is not of type boolean');

    const start = this.value.substr(0, query.length);

    if (caseSensitive) {
      if (start !== query) {
        return this._addError('startsWith', query, start, `Expected ${this.value} to start with ${query}`);
      }

    /* Case insensitive: */
    } else if (start.toLowerCase() !== query.toLowerCase()) {
      return this._addError('startsWith (case sensitive)', query, start, `Expected ${this.value} to (case insensitive) start with ${query}`);
    }

    return this;
  }

  /**
   * Check if value is uppercase
   * @return {Object} StringValidator
   */
  uppercase () {
    if (this.props.uppercase !== this.value) {
      this._addError('uppercase', this.props.uppercase, this.value, `Expected ${this.value} to be uppercase`);
    }

    return this;
  }

  upperCase () {
    return this.uppercase();
  }

}

module.exports = StringValidator;
