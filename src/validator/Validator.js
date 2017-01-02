const BooleanValidator  = require('./types/Boolean');
const NumberValidator   = require('./types/Number');
const StringValidator   = require('./types/String');

class Validator {

  constructor (value) {
    this.value = value;
  }

  bool () {
    return this.boolean();
  }

  boolean () {
    return new BooleanValidator(this.value);
  }

  number () {
    return new NumberValidator(this.value);
  }

  string () {
    return new StringValidator(this.value);
  }

}

module.exports = Validator;
