const BaseValidator = require('./Base');

class BooleanValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('boolean');

    if (!this.valid()) {
      this.value = false;
    }
  }

  /**
   * Check if the value equals the query
   * @param  {Boolean} query value to compare the value to
   * @return {Object}        BooleanValidator
   */
  equals (query) {
    new BooleanValidator(query).throw('BooleanValidator.equals: query is not of type boolean');

    if (this.value !== query) {
      this._addError('equals', query, this.value, `Expected ${this.value} to equal ${query}`);
    }

    return this;
  }

  /**
   * Check if value is false
   * @return {Object} BooleanValidator
   */
  false () {
    return this.equals(false);
  }

  /**
   * Check if value is true
   * @return {Object} BooleanValidator
   */
  true () {
    return this.equals(true);
  }

}

module.exports = BooleanValidator;
