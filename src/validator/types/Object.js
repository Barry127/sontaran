const BaseValidator = require('./Base');

function validate (value) {
  // eslint-disable-next-line global-require
  const Validator = require('../Validator');

  return new Validator(value);
}

class ObjectValidator extends BaseValidator {

  constructor (value) {
    super(value);

    this._checkType('object');
  }

  /**
   * Object has own property with keyName key
   * @param  {Mixed}   key keyName
   * @return {Object}      ObjectValidator
   */
  hasOwnProperty (key) {
    if (!Object.prototype.hasOwnProperty.call(this.value, key)) {
      return this._addError('hasOwnProperty', key, undefined, `Expected ${JSON.stringify(this.value)} to have own property ${key}`);
    }

    return this;
  }

  /**
   * Validate an object key
   * @param  {Mixed}    key        keyName
   * @param  {Function} validateFn Validator function, takes one argument: an instance of Validator
   * @return {Object}              ObjectValidator
   */
  key (key, validateFn) {
    if (typeof validateFn !== 'function') {
      throw new Error('ObjectValidator.key: validateFn is not a function');
    }

    let validator = validateFn(validate(this.value[key]));

    if (this.value[key] === undefined) {
      if (validator._isRequired()) {
        return this._addError('key', key, undefined, `Key ${key} of ${JSON.stringify(this.value)} is required`);
      }

      return this;
    }

    if (!validator.valid) {
      validator = new BaseValidator(this.value[key]);
    }

    if (!validator.valid()) {
      return this._addError('key', key, validator.errors(), `Expected key ${key} of ${JSON.stringify(this.value)} to be valid`);
    }

    return this;
  }

  /**
   * Validate given object keys
   * @param  {Object} keyList List of keys paired with validateFn
   * @return {Object}         ObjectValidator
   */
  keys (keyList) {
    new ObjectValidator(keyList).throw('ObjectValidator.keys: keyList is not of type object');

    Object.keys(keyList).forEach((key) => {
      this.key(key, keyList[key]);
    });

    return this;
  }

}

module.exports = ObjectValidator;
