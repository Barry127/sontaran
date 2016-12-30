const BooleanValidator  = require('./types/Boolean');
const NumberValidator   = require('./types/Number');

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

}

module.exports = Validator;
