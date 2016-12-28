const { expect }    = require('chai');
const BaseValidator = require('./Base');

describe('Validator / types / Base', () => {

  it('Sets the value', () => {
    const value = 'Awesome';
    const validator = new BaseValidator(value);
    expect(validator.value).to.equal('Awesome');
  });

  describe('_checkType', () => {

    it('checks for primitive type Boolean', () => {
      const boolean   = true;
      const validator = new BaseValidator(boolean);

      expect(validator._checkType('boolean')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType.bind(validator, 'number')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'object')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'string')).to.throw(TypeError);
    });

    it('checks for primitive type Number', () => {
      const number    = 42;
      const validator = new BaseValidator(number);

      expect(validator._checkType('number')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType.bind(validator, 'boolean')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'object')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'string')).to.throw(TypeError);
    });

    it('checks for primitive type Object', () => {
      const object    = {};
      const validator = new BaseValidator(object);

      expect(validator._checkType('object')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType.bind(validator, 'boolean')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'number')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'string')).to.throw(TypeError);
    });

    it('checks for primitive type String', () => {
      const string    = 'Reticulating splines';
      const validator = new BaseValidator(string);

      expect(validator._checkType('string')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType.bind(validator, 'boolean')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'number')).to.throw(TypeError);
      expect(validator._checkType.bind(validator, 'object')).to.throw(TypeError);
    });

  });

});
