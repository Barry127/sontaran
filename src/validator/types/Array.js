/* eslint no-new: "off" */

const BaseValidator     = require('./Base');
const NumberValidator   = require('./Number');
const StringValidator   = require('./String');

class ArrayValidator extends BaseValidator {

  constructor (value) {
    super(value);

    if (!Array.isArray(value)) {
      const type = typeof value;

      throw new TypeError(`Expected ${type} to be an Array`);
    }

  }

  /**
   * Check if length of value array is between minLength and maxLength (inclusive)
   * @param  {Number} minLength minimum length for value array
   * @param  {Number} maxLength maximum length for value array
   * @return {Object}           ArrayValidator
   */
  between (minLength, maxLength) {
    new NumberValidator(minLength).integer();
    new NumberValidator(maxLength).integer();

    return this.min(minLength).max(maxLength);
  }

  /**
   * Check if value array contains value
   * @param  {Array|Boolean|Number|Object|String} value array should contain this value
   * @return {Object}                                   ArrayValidator
   */
  contains (value) {
    if (this.value.indexOf(value) === -1) {
      throw new Error(`Expected [${this.value.toString()}] to contain ${value}`);
    }

    return this;
  }

  each (fn) {
    return this.forEach(fn);
  }

  /**
   * Run function fn on each value in value array
   * @param  {Function} fn function to run on each value. Takes 3 arguments: element, index, array
   * @return {Object}      ArrayValidator
   */
  forEach (fn) {
    this._checkType.call({ value: fn }, 'function');

    try {
      this.value.forEach(fn);
    } catch (error) {
      throw new Error(`Expected [${this.value.toString()}] forEach not to throw: ${error.message}`);
    }

    return this;
  }

  /**
   * Check if length of value array is exactly length
   * @param  {Number} length Length the value array should be
   * @return {Object}        ArrayValidator
   */
  length (length) {
    new NumberValidator(length).integer();

    if (this.value.length !== length) {
      throw new Error(`Expected length of [${this.value.toString()}] to be exactly ${length}`);
    }

    return this;
  }

  /**
   * Check if length of value array is not greater than maxLength
   * @param  {Number} maxLength maximum length for value array
   * @return {Object}           ArrayValidator
   */
  max (maxLength) {
    new NumberValidator(maxLength).integer();

    if (this.value.length > maxLength) {
      throw new Error(`Expected length of [${this.value.toString()}] to be at most ${maxLength}`);
    }

    return this;
  }

  /**
   * Check if length of value array is not less than minLength
   * @param  {Number} minLength minimum length for value array
   * @return {Object}           ArrayValidator
   */
  min (minLength) {
    new NumberValidator(minLength).integer();

    if (this.value.length < minLength) {
      throw new Error(`Expected length of [${this.value.toString()}] to be at least ${minLength}`);
    }

    return this;
  }

  /**
   * Check if all elements of value array are of type tpe
   * @param  {String} type type all value elements should be
   * @return {Object}      ArrayValidator
   */
  of (type) {
    new StringValidator(type);

    switch (type.toLowerCase()) {

    case 'bool':
    case 'boolean':
    case 'number':
    case 'object':
    case 'string':
      this.value.forEach((element) => {
        if (type === 'bool') {
          type = 'boolean'; // eslint-disable-line
        }
        this._checkType.call({ value: element }, type.toLowerCase());
      });
      break;

    case 'array':
      this.value.forEach((element) => {
        if (!Array.isArray(element)) {
          const elementType = typeof element;

          throw new TypeError(`Expected ${elementType} to be an Array`);
        }
      });
      break;

    default:
      throw new Error(`could not determine how to check [${this.value.toString()}] for type ${type}`);

    }

    return this;
  }

}

module.exports = ArrayValidator;
