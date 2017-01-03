const { expect }        = require('chai');
const { spy }           = require('sinon');
const ArrayValidator    = require('./types/Array');
const BooleanValidator  = require('./types/Boolean');
const NumberValidator   = require('./types/Number');
const StringValidator   = require('./types/String');
const Validator         = require('./Validator');

describe('Validator / Validator', () => {

  it('Sets the value', () => {
    const value = 'Hello World!';
    const validator = new Validator(value);

    expect(validator.value).to.equal('Hello World!');
  });

  describe('array', () => {
    const validator = new Validator([]);

    it('Returns an instance of ArrayValidator', () => {
      expect(validator.array()).to.be.an.instanceof(ArrayValidator);
    });
  })

  describe('boolean', () => {
    const validator = new Validator(true);

    it('Returns an instance of BooleanValidator', () => {
      expect(validator.boolean()).to.be.an.instanceof(BooleanValidator);
    });

    it('bool is a shortcut for boolean', () => {
      validator.boolean = spy();
      validator.bool();

      expect(validator.boolean.calledOnce).to.be.ok;
    });

  });

  describe('number', () => {
    const validator = new Validator(42);

    it('Returns an instance of NumberValidator', () => {
      expect(validator.number()).to.be.an.instanceof(NumberValidator);
    });
  });

  describe('string', () => {
    const validator = new Validator('Hello World!');

    it('Returns an instance of StringValidator', () => {
      expect(validator.string()).to.be.an.instanceof(StringValidator);
    });
  })

});
