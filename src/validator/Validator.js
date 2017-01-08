const ArrayValidator    = require('.//types/Array');
const BooleanValidator  = require('./types/Boolean');
const EmailValidator    = require('./types/Email');
const NumberValidator   = require('./types/Number');
const RegExpValidator   = require('./types/RegExp');
const StringValidator   = require('./types/String');

class Validator {

  constructor (value) {
    this.value = value;
  }

  array () {
    return new ArrayValidator(this.value);
  }

  bool () {
    return this.boolean();
  }

  boolean () {
    return new BooleanValidator(this.value);
  }

  email () {
    return new EmailValidator(this.value);
  }

  number () {
    return new NumberValidator(this.value);
  }

  regexp () {
    return this.regExp();
  }

  regExp () {
    return new RegExpValidator(this.value);
  }

  string () {
    return new StringValidator(this.value);
  }

}

module.exports = Validator;
