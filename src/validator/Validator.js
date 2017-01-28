const ArrayValidator    = require('./types/Array');
const BooleanValidator  = require('./types/Boolean');
const EmailValidator    = require('./types/Email');
const NetworkValidator  = require('./types/Network');
const NumberValidator   = require('./types/Number');
const ObjectValidator   = require('./types/Object');
const RegExpValidator   = require('./types/RegExp');
const StringValidator   = require('./types/String');

class Validator {

  constructor (value) {
    this.value = value;
  }

  array () {
    return new ArrayValidator(this.value, Validator);
  }

  bool () {
    return this.boolean();
  }

  boolean () {
    return new BooleanValidator(this.value, Validator);
  }

  email () {
    return new EmailValidator(this.value, Validator);
  }

  network () {
    return new NetworkValidator(this.value, Validator);
  }

  number () {
    return new NumberValidator(this.value, Validator);
  }

  object () {
    return new ObjectValidator(this.value, Validator);
  }

  regexp () {
    return this.regExp();
  }

  regExp () {
    return new RegExpValidator(this.value, Validator);
  }

  string () {
    return new StringValidator(this.value, Validator);
  }

}

module.exports = Validator;
