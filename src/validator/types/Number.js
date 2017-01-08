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
    new NumberValidator(minValue).notNaN().throw('NumberValidator.between: minValue is not a valid number');
    new NumberValidator(maxValue).notNaN().throw('NumberValidator.between: maxValue is not a valid number');
    new BooleanValidator(inclusive).throw('NumberValidator.between: inclusive is not of type boolean');

    if (inclusive) {
      if (this.value < minValue) {
        return this._addError('min', minValue, this.value, `Expected ${this.value} to be at least ${minValue}`);
      }
      if (this.value > maxValue) {
        return this._addError('max', maxValue, this.value, `Expected ${this.value} to be at most ${maxValue}`);
      }
    } else {
      if (this.value <= minValue) {
        return this._addError('greaterThan', `> ${minValue}`, this.value, `Expected ${this.value} to be greater than ${minValue}`);
      }
      if (this.value >= maxValue) {
        return this._addError('lessThan', `< ${maxValue}`, this.value, `Expected ${this.value} to be less than ${maxValue}`);
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
    new NumberValidator(checkValue).throw('NumberValidator.equals: checkValue is not of type number');

    if (this.value !== checkValue) {
      return this._addError('equals', checkValue, this.value, `Expected ${this.value} to equal ${checkValue}`);
    }

    return this;
  }

  /**
   * Check if value is greater than minValue
   * @param  {Number} minValue value needs to be greater than this
   * @return {Object}          NumberValidator
   */
  greaterThan (minValue) {
    new NumberValidator(minValue).notNaN().throw('NumberValidator.greaterThan: minValue is not a valid number');

    return this.between(minValue, Number.POSITIVE_INFINITY, false);
  }

  int () {
    return this.integer();
  }

  /**
   * Check if value is an integer
   * @return {Object} NumberValidator
   */
  integer () {
    if (!Number.isInteger(this.value)) {
      this._addError('integer', Math.floor(this.value), this.value, `Expected ${this.value} to be an integer`);
    }

    return this;
  }

  /**
   * Check if value is less than maxValue
   * @param  {Number} maxValue value needs to be less than this
   * @return {Object}          NumberValidator
   */
  lessThan (maxValue) {
    new NumberValidator(maxValue).notNaN().throw('NumberValidator.lessThan: maxValue is not a valid number');

    return this.between(Number.NEGATIVE_INFINITY, maxValue, false);
  }

  /**
   * Check if value is not greater than maxValue
   * @param  {Number} maxValue maximum value (inclusive)
   * @return {Object}          NumberValidator
   */
  max (maxValue) {
    new NumberValidator(maxValue).notNaN().throw('NumberValidator.max: maxValue is not a valid number');

    return this.between(Number.NEGATIVE_INFINITY, maxValue, true);
  }

  /**
   * Check if value is not less than minValue
   * @param  {Number} minValue minimum value (inclusive)
   * @return {Object}          NumberValidator
   */
  min (minValue) {
    new NumberValidator(minValue).notNaN().throw('NumberValidator.min: minValue is not a valid number');

    return this.between(minValue, Number.POSITIVE_INFINITY, true);
  }

  /**
   * Check if value is NaN
   * @return {Object} NumberValidator
   */
  NaN () {
    if (!Number.isNaN(this.value)) {
      return this._addError('NaN', Number.NaN, this.value, `Expected ${this.value} to be NaN`);
    }

    return this;
  }

  naN () {
    return this.NaN();
  }

  nan () {
    return this.NaN();
  }

  /**
   * Check if value is a valid number (not NaN)
   * @return {Object} NumberValidator
   */
  notNaN () {
    if (Number.isNaN(this.value)) {
      return this._addError('notNaN', 'not NaN', this.value, `Expected ${this.value} to not be NaN`);
    }

    return this;
  }

  notNan () {
    return this.notNaN();
  }

}

module.exports = NumberValidator;
