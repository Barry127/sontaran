const BooleanValidator  = require('./types/Boolean');

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

}

module.exports = Validator;
