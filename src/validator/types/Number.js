/* eslint no-new: "off" */

const BaseValidator     = require('./Base');
const BooleanValidator  = require('./Boolean');

class NumberValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('number');
  }

  /**
   * Check if value is between minValue and maxValue
   * @param  {Number}  minValue  minimum value
   * @param  {Number}  maxValue  maxmimum value
   * @param  {Boolean} inclusive are the values minValue and maxValue inclusive
   * @return {Object}            NumberValidator
   */
  between (minValue, maxValue, inclusive = false) {
    new NumberValidator(minValue).notNaN();
    new NumberValidator(maxValue).notNaN();
    new BooleanValidator(inclusive);

    if (minValue > maxValue) {
      throw new Error(`NumberValidator:between expected maxValue: ${maxValue} to be greater than minValue: ${minValue}`);
    }

    if (inclusive) {
      this.min(minValue).max(maxValue);
    } else {
      if (this.value <= minValue) {
        throw new Error(`Expected ${this.value} to be greater than ${minValue}`);
      }
      if (this.value >= maxValue) {
        throw new Error(`Expected ${this.value} to be less than ${maxValue}`);
      }
    }

    return this;
  }

  /**
   * Check if value equals checkValue
   * @param  {Number} checkValue Value to equal to
   * @return {Object}            NumberValidator
   */
  equals (checkValue) {
    new NumberValidator(checkValue);

    if (checkValue !== this.value) {
      throw new Error(`Expected ${this.value} to equal ${checkValue}`);
    }

    return this;
  }

  int () {
    return this.integer();
  }

  /**
   * Check if value is an integer
   * @return {Object} NumberValidator
   */
  integer () {
    if (Math.floor(this.value) !== this.value || Math.abs(this.value) > Number.MAX_SAFE_INTEGER) {
      throw new Error(`Expected ${this.value} to be an intger`);
    }

    return this;
  }

  /**
   * Check if value is not greater than maxValue
   * @param  {Number} maxValue maximum value (inclusive)
   * @return {Object}          NumberValidator
   */
  max (maxValue) {
    new NumberValidator(maxValue).notNaN();

    if (this.value > maxValue) {
      throw new Error(`Expected ${this.value} to be at most ${maxValue}`);
    }

    return this;
  }

  /**
   * Check if value is not less than minValue
   * @param  {Number} minValue minimum value (inclusive)
   * @return {Object}          NumberValidator
   */
  min (minValue) {
    new NumberValidator(minValue).notNaN();

    if (this.value < minValue) {
      throw new Error(`Expected ${this.value} to be at least ${minValue}`);
    }

    return this;
  }

  /**
   * Check if value is NaN
   * @return {Object} NumberValidator
   */
  NaN () {
    if (this.value === this.value) {
      throw new Error(`Expected ${this.value} to be NaN`);
    }

    return this;
  }

  naN () {
    return this.NaN(); // eslint-disable-line
  }

  nan () {
    return this.NaN(); // eslint-disable-line
  }

  /**
   * Check if value is a valid number (not NaN)
   * @return {Object} NumberValidator
   */
  notNaN () {
    if (this.value !== this.value) {
      throw new Error(`Expected ${this.value} to not be NaN`);
    }

    return this;
  }

  notNan () {
    return this.notNaN();
  }

}

module.exports = NumberValidator;
