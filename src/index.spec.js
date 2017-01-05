const { expect }    = require('chai');
const { validate }  = require('./index');
const Validator     = require('./src/validator/Validator');

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

});
