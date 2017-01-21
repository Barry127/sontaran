const { expect }        = require('chai');
const { spy }           = require('sinon');
const ArrayValidator    = require('./types/Array');
const BooleanValidator  = require('./types/Boolean');
const EmailValidator    = require('./types/Email');
const NetworkValidator  = require('./types/Network');
const NumberValidator   = require('./types/Number');
const ObjectValidator   = require('./types/Object');
const RegExpValidator   = require('./types/RegExp');
const StringValidator   = require('./types/String');
const Validator         = require('./Validator');

describe('Validator / Validator', () => {

  it('Sets the value', () => {
    const value = 'Hello World!';
    const validator = new Validator(value);

    expect(validator.value).to.equal('Hello World!');
  });

  describe('array', () => {

    it('Returns an instance of ArrayValidator', () => {
      const validator = new Validator([]);
      expect(validator.array()).to.be.an.instanceof(ArrayValidator);
    });
  });

  describe('bool', () => {

    it('Calls boolean', () => {
      const validator = new Validator(true);
      validator.boolean = spy();
      validator.bool();

      expect(validator.boolean.calledOnce).to.be.true;
    });

  });

  describe('boolean', () => {

    it('Returns an instance of BooleanValidator', () => {
      const validator = new Validator(true);
      expect(validator.boolean()).to.be.an.instanceof(BooleanValidator);
    });

  });

  describe('email', () => {

    it('Returns an instance of EmailValidator', () => {
      const validator = new Validator('john.doe@example.com');
      expect(validator.email()).to.be.an.instanceof(EmailValidator);
    });

  });

  describe('network', () => {

    it('Returns an instance of NetworkValidator', () => {
      const validator = new Validator('127.0.0.1');
      expect(validator.network()).to.be.an.instanceof(NetworkValidator);
    });
  });

  describe('number', () => {

    it('Returns an instance of NumberValidator', () => {
      const validator = new Validator(42);
      expect(validator.number()).to.be.an.instanceof(NumberValidator);
    });
  });

  describe('object', () => {

    it('Returns an instance of ObjectValidator', () => {
      const validator = new Validator({});
      expect(validator.object()).to.be.an.instanceof(ObjectValidator);
    });
  });

  describe('regExp', () => {

    it('Returns an instance of RegExpValidator', () => {
      const validator = new Validator(/[a-z]/);
      expect(validator.regExp()).to.be.an.instanceof(RegExpValidator);
    });

  });

  describe('regexp', () => {

    it('Calls regExp', () => {
      const validator = new Validator(/[a-z]/);
      validator.regExp = spy();
      validator.regexp();

      expect(validator.regExp.calledOnce).to.be.true;
    })

  });

  describe('string', () => {

    it('Returns an instance of StringValidator', () => {
      const validator = new Validator('Hello World!');
      expect(validator.string()).to.be.an.instanceof(StringValidator);
    });
  });

});
