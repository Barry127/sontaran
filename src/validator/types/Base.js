const ERRORS    = Symbol('ERRORS');
const REQUIRED  = Symbol('REQUIRED');

class BaseValidator {

  constructor (value) {
    this.value = value;

    this[ERRORS] = [];
    this[REQUIRED] = false;
  }

  _addError (type, expected, actual, message) {
    if (typeof type === 'object') {
      this[ERRORS].push(type);
      return this;
    }

    if (typeof type === 'string') {
      this[ERRORS].push({
        type,
        expected,
        actual,
        message
      });
      return this;
    }

    throw new TypeError('_addError: Expected type to be of type object or string');
  }

  _checkType (expectedType) {
    const type = typeof this.value;

    if (type !== expectedType) {
      return this._addError('type', expectedType, type, `Expected ${type} to be of type ${expectedType}`);
    }

    return this;
  }

  _isRequired () {
    return this[REQUIRED];
  }

  /**
   * Get an array of all errors
   * @return {Array} Errors
   */
  errors () {
    return this[ERRORS].slice(0);
  }

  getErrors () {
    return this.errors();
  }

  /**
   * Return true if the length of errors is greater than 0
   * @return {Boolean} are there errors
   */
  invalid () {
    return !this.valid();
  }

  result () {
    return this.valid();
  }

  /**
   * (for ObjectValidator) Is this key required?
   * @param  {Boolean} isRequired Is this key required
   * @return {Object}             BaseValidator
   */
  required (isRequired = true) {
    new BaseValidator(isRequired)
      ._checkType('boolean')
      .throw('BaseValidator.required: isRequired is not of type boolean');

    this[REQUIRED] = isRequired;

    return this;
  }

  /**
   * Throws the message param first errors message
   * @param  {String} message message to throw
   * @return {Void}
   */
  throw (message) {
    if (this.invalid()) {
      throw new Error(message || this[ERRORS][0].message);
    }
  }

  /**
   * Return true if the length of errors is 0
   * @return {Boolean} are there no errors
   */
  valid () {
    return this[ERRORS].length === 0;
  }
}

module.exports = BaseValidator;
