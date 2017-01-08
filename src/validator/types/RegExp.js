const BaseValidator = require('./Base');

class RegExpValidator extends BaseValidator {

  constructor (value) {
    super(value);

    if (!(value instanceof RegExp)) {
      const type = typeof value;
      this._addError('type', 'RegExp', type, `Expected ${type} to be and instance of RegExp`);
    }
  }

}

module.exports = RegExpValidator;
