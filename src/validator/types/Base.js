class BaseValidator {

  constructor (value) {
    this.value = value;
  }

  _checkType (expectedType) {
    const type = typeof this.value;

    if (type !== expectedType) {
      throw new TypeError(`Expected ${type} to be ${expectedType}`);
    }

    return this;
  }
}

module.exports = BaseValidator;
