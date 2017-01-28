const { expect }    = require('chai');
const { validate, validators }  = require('./index');
const Validator     = require('./validator/Validator');

const ArrayValidator    = require('./validator/types/Array');
const BaseValidator     = require('./validator/types/Base');
const BooleanValidator  = require('./validator/types/Boolean');
const EmailValidator    = require('./validator/types/Email');
const NetworkValidator  = require('./validator/types/Network');
const NumberValidator   = require('./validator/types/Number');
const ObjectValidator   = require('./validator/types/Object');
const RegExpValidator   = require('./validator/types/RegExp');
const StringValidator   = require('./validator/types/String');

describe('index', () => {

  describe('validate', () => {
    const result = validate('this');

    it('Returns an instance of Validator', () => {
      expect(result).to.be.an.instanceof(Validator);
    });

    it('passes the value to Validator instance', () => {
      expect(result.value).to.equal('this');
    });
  });

  describe('validators', () => {

    it('Exports ArrayValidator', () => {
      expect(validators.ArrayValidator).to.equal(ArrayValidator);
    });

    it('Exports BaseValidator', () => {
      expect(validators.BaseValidator).to.equal(BaseValidator);
    });

    it('Exports BooleanValidator', () => {
      expect(validators.BooleanValidator).to.equal(BooleanValidator);
    });

    it('Exports EmailValidator', () => {
      expect(validators.EmailValidator).to.equal(EmailValidator);
    });

    it('Exports NetworkValidator', () => {
      expect(validators.NetworkValidator).to.equal(NetworkValidator);
    });

    it('Exports NumberValidator', () => {
      expect(validators.NumberValidator).to.equal(NumberValidator);
    });

    it('Exports ObjectValidator', () => {
      expect(validators.ObjectValidator).to.equal(ObjectValidator);
    });

    it('Exports RegExpValidator', () => {
      expect(validators.RegExpValidator).to.equal(RegExpValidator);
    });

    it('Exports StringValidator', () => {
      expect(validators.StringValidator).to.equal(StringValidator);
    });

  });

});
