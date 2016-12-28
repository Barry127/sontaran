const { expect }        = require('chai');
const { spy }           = require('sinon');
const BooleanValidator  = require('./types/Boolean');
const Validator         = require('./Validator');

describe('Validator / Validator', () => {

  it('Sets the value', () => {
    const value = 'Hello World!';
    const validator = new Validator(value);

    expect(validator.value).to.equal('Hello World!');
  });

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

});
