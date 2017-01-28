const Validator         = require('./validator/Validator');

const ArrayValidator    = require('./validator/types/Array');
const BooleanValidator  = require('./validator/types/Boolean');
const EmailValidator    = require('./validator/types/Email');
const NetworkValidator  = require('./validator/types/Network');
const NumberValidator   = require('./validator/types/Number');
const ObjectValidator   = require('./validator/types/Object');
const RegExpValidator   = require('./validator/types/RegExp');
const StringValidator   = require('./validator/types/String');

const validate = function validate (value) {
  return new Validator(value);
};

module.exports = {
  validate,
  validators: {
    ArrayValidator,
    BooleanValidator,
    EmailValidator,
    NetworkValidator,
    NumberValidator,
    ObjectValidator,
    RegExpValidator,
    StringValidator
  }
};
