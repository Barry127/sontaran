const BaseValidator = require('./Base');

class BooleanValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('boolean');
  }

  /**
   * Check if value is false
   * @return {Object} BooleanValidator
   */
  false () {
    if (this.value !== false) {
      throw new Error(`Expected ${this.value} to be false`);
    }

    return this;
  }

  /**
   * Check if value is true
   * @return {Object} BooleanValidator
   */
  true () {
    if (this.value !== true) {
      throw new Error(`Expected ${this.value} to be true`);
    }

    return this;
  }

}

module.exports = BooleanValidator;
