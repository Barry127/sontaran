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

  _checkRegExp (check) { // eslint-disable-line
    if (!(check instanceof RegExp)) {
      throw new TypeError(`Expected ${check} to be RegExp`);
    }
  }
}

module.exports = BaseValidator;
