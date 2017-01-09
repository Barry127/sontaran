const BaseValidator     = require('./Base');
const NumberValidator   = require('./Number');
const StringValidator   = require('./String');

class ArrayValidator extends BaseValidator {

  constructor (value) {
    super(value);

    if (!Array.isArray(value)) {
      const type = typeof value;

      this._addError('type', 'Array', type, `Expected ${type} to be an Array`);
    }
  }

  /**
   * Check if length of value array is between minLength and maxLength (inclusive)
   * @param  {Number} minLength minimum length for value array
   * @param  {Number} maxLength maximum length for value array
   * @return {Object}           ArrayValidator
   */
  between (minLength, maxLength) {
    return this.min(minLength).max(maxLength);
  }

  /**
   * Check if value array contains value
   * @param  {Array|Boolean|Number|Object|String} value array should contain this value
   * @return {Object}                                   ArrayValidator
   */
  contains (value) {
    if (this.value.indexOf(value) === -1) {
      return this._addError('contains', value, `[${this.value.toString()}]`, `Expected [${this.value.toString()}] to contain ${value}`);
    }

    return this;
  }

  each (fn) {
    return this.forEach(fn);
  }

  /**
   * Run function fn on each value in value array return a string to set error
   * @param  {Function} fn function to run on each value.
   *                       Takes 3 arguments: element, index, array. Returns (string) error | void
   * @return {Object}      ArrayValidator
   */
  forEach (fn) {
    if (typeof fn !== 'function') {
      throw new Error('ArrayValidator.forEach: fn is not a function');
    }

    this.value.forEach((element, index, array) => {
      const result = fn(element, index, array);

      if (typeof result === 'string') {
        this._addError('forEach', null, element, result);
      }
    });

    return this;
  }

  /**
   * Check if length of value array is exactly length
   * @param  {Number} length Length the value array should be
   * @return {Object}        ArrayValidator
   */
  length (length) {
    new NumberValidator(length).integer().throw('ArrayValidator.length: length is not a valid integer');

    if (this.value.length !== length) {
      return this._addError('length', length, this.value.length, `Expected length of [${this.value.toString()}] to be exactly ${length}`);
    }

    return this;
  }

  /**
   * Check if length of value array is not greater than maxLength
   * @param  {Number} maxLength maximum length for value array
   * @return {Object}           ArrayValidator
   */
  max (maxLength) {
    new NumberValidator(maxLength).integer().throw('ArrayValidator.max: maxLength is not a valid integer');

    if (this.value.length > maxLength) {
      return this._addError('max', maxLength, this.value.length, `Expected length of [${this.value.toString()}] to be at most ${maxLength}`);
    }

    return this;
  }

  /**
   * Check if length of value array is not less than minLength
   * @param  {Number} minLength minimum length for value array
   * @return {Object}           ArrayValidator
   */
  min (minLength) {
    new NumberValidator(minLength).integer().throw('ArrayValidator.min: minLength is not a valid integer');

    if (this.value.length < minLength) {
      return this._addError('min', minLength, this.value.length, `Expected length of [${this.value.toString()}] to be at least ${minLength}`);
    }

    return this;
  }

  /**
   * Check if all elements of value array are of primitive type
   * @param  {String} type type all value elements should be
   * @return {Object}      ArrayValidator
   */
  of (type) {
    new StringValidator(type).throw('ArrayValidator.of: type is not of type string');
    let errors = false;

    switch (type.toLowerCase()) {

      case 'bool':
      case 'boolean':
      case 'function':
      case 'number':
      case 'object':
      case 'string':
        this.value.forEach((element) => {
          if (type === 'bool') {
            type = 'boolean'; // eslint-disable-line
          }
          // eslint-disable-next-line valid-typeof
          if (typeof element !== type.toLowerCase()) {
            errors = true;
          }
        });
        break;

      case 'array':
        this.value.forEach((element) => {
          if (!Array.isArray(element)) {
            errors = true;
          }
        });
        break;

      default:
        return this._addError('of', type, `[${this.value.toString()}]`, `could not determine how to check [${this.value.toString()}] for type ${type}`);

    }

    if (errors) {
      return this._addError('of', type, `[${this.value.toString()}]`, `Expected all elements of [${this.value.toString()}] to be of type ${type}`);
    }

    return this;
  }

}

module.exports = ArrayValidator;
