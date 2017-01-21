const { expect }    = require('chai');
const { spy }       = require('sinon');
const BaseValidator = require('./Base');

describe('Validator / types / Base', () => {

  it('Sets the value', () => {
    const value = 'Awesome';
    const validator = new BaseValidator(value);

    expect(validator.value).to.equal('Awesome');
  });

  it('Has no errors by default', () => {
    const validator = new BaseValidator();

    expect(validator.errors().length).to.equal(0);
  });

  describe('_addError', () => {

    it('Throws a TypeError if type is not of type object or string', () => {
      const validator = new BaseValidator();

      expect(validator._addError).to.throw(TypeError, /_addError/);
    });

    it('Pushes the object if type is of type object to errors and returns itself', () => {
      const validator = new BaseValidator();
      const e1 = { error: 1 };
      const e2 = { error: 2 };

      expect(validator._addError(e1)._addError(e2)).to.be.an.instanceof(BaseValidator);

      const errors = validator.errors();

      expect(errors.length).to.equal(2);
      expect(errors[0]).to.equal(e1);
      expect(errors[1]).to.equal(e2);
    });

    it('Pushes value of all params if type is of type string to errors', () => {
      const validator = new BaseValidator();

      expect(validator._addError('test', 1, 2, 'expected 2 to be 1')).to.be.an.instanceof(BaseValidator);

      const errors = validator.errors();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.deep.equal({
        type: 'test',
        expected: 1,
        actual: 2,
        message: 'expected 2 to be 1'
      });
    });

  });

  describe('_checkType', () => {

    it('checks for primitive type Boolean', () => {
      const boolean   = true;
      const validator = new BaseValidator(boolean);

      expect(validator._checkType('boolean')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('boolean').valid()).to.be.true;
      expect(validator._checkType('number')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('number').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'number',
        actual: 'boolean',
        message: 'Expected boolean to be of type number'
      });
      expect(validator._checkType('object')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('object').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'object',
        actual: 'boolean',
        message: 'Expected boolean to be of type object'
      });
      expect(validator._checkType('string')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('string').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'string',
        actual: 'boolean',
        message: 'Expected boolean to be of type string'
      });

    });

    it('checks for primitive type Number', () => {
      const number    = 42;
      const validator = new BaseValidator(number);

      expect(validator._checkType('number')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('number').valid()).to.be.true;
      expect(validator._checkType('boolean')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('boolean').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'boolean',
        actual: 'number',
        message: 'Expected number to be of type boolean'
      });
      expect(validator._checkType('object')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('object').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'object',
        actual: 'number',
        message: 'Expected number to be of type object'
      });
      expect(validator._checkType('string')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('string').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'string',
        actual: 'number',
        message: 'Expected number to be of type string'
      });
    });

    it('checks for primitive type Object', () => {
      const object    = {};
      const validator = new BaseValidator(object);

      expect(validator._checkType('object')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('object').valid()).to.be.true;
      expect(validator._checkType('boolean')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('boolean').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'boolean',
        actual: 'object',
        message: 'Expected object to be of type boolean'
      });
      expect(validator._checkType('number')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('number').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'number',
        actual: 'object',
        message: 'Expected object to be of type number'
      });
      expect(validator._checkType('string')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('string').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'string',
        actual: 'object',
        message: 'Expected object to be of type string'
      });
    });

    it('checks for primitive type String', () => {
      const string    = 'Reticulating splines';
      const validator = new BaseValidator(string);

      expect(validator._checkType('string')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('string').valid()).to.be.true;
      expect(validator._checkType('boolean')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('boolean').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'boolean',
        actual: 'string',
        message: 'Expected string to be of type boolean'
      });
      expect(validator._checkType('number')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('number').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'number',
        actual: 'string',
        message: 'Expected string to be of type number'
      });
      expect(validator._checkType('object')).to.be.an.instanceof(BaseValidator);
      expect(validator._checkType('object').errors().pop()).to.deep.equal({
        type: 'type',
        expected: 'object',
        actual: 'string',
        message: 'Expected string to be of type object'
      });
    });

  });

describe('_isRequired', () => {

  let validator;

  beforeEach(() => {
    validator = new BaseValidator();
  });

  it('A validator (key) is not required by default', () => {
    expect(validator._isRequired()).to.be.false;
  });

  it('Returns true if key is required', () => {
    validator.required();
    expect(validator._isRequired()).to.be.true;
  });

});

  describe('errors', () => {

    it('Returns a clone of all error', () => {
      const validator = new BaseValidator();
      validator._addError({})._addError({})._addError({});

      const errors = validator.errors();

      expect(errors.length).to.equal(3);

      errors.pop();

      expect(errors.length).to.equal(2);
      expect(validator.errors().length).to.equal(3);
    });

  });

  describe('getErrors', () => {

    it('Calls errors', () => {
      const validator = new BaseValidator();
      validator.errors = spy();
      validator.getErrors();

      expect(validator.errors.calledOnce).to.be.true;
    });

  });

  describe('invalid', () => {

    it('Returns false if there are no errors', () => {
      const validator = new BaseValidator();

      expect(validator.invalid()).to.be.false;
    });

    it('Returns true if there are errors', () => {
      const validator = new BaseValidator();
      validator._addError({});

      expect(validator.invalid()).to.be.true;
    });

  });

  describe('result', () => {

    it('Calls valid', () => {
      const validator = new BaseValidator();
      validator.valid = spy();
      validator.result();

      expect(validator.valid.calledOnce).to.be.true;
    });

  });

  describe('required', () => {

    let validator;

    beforeEach(() => {
      validator = new BaseValidator();
    });

    it('Throws an Error if isRequired is not of type boolean', () => {
      expect(validator.required.bind(validator, 'true')).to.throw(Error, 'BaseValidator.required: isRequired is not of type boolean');
    });

    it('Returns itself', () => {
      expect(validator.required()).to.be.an.instanceof(BaseValidator);
      expect(validator.required(false)).to.be.an.instanceof(BaseValidator);
    });

    it('Sets required to true if no value is passed', () => {
      validator.required();
      expect(validator._isRequired()).to.be.true;
    });

    it('Sets required to false if isRequired is false', () => {
      validator.required(false);
      expect(validator._isRequired()).to.be.false;
    });

    it('Chains and keeps the last call to require as value', () => {
      validator.required(true).required(false).required();
      expect(validator._isRequired()).to.be.true;
    });

  });

  describe('throw', () => {

    it('Returns undefined if there are no errors', () => {
      const validator = new BaseValidator();

      expect(validator.throw()).to.be.undefined;
    });

    it('Throws message if there are errors', () => {
      const validator = new BaseValidator();
      validator._addError('type', 'expected', 'actual', 'errorMessage');

      expect(validator.throw.bind(validator, 'messageParam')).to.throw(Error, 'messageParam');
    });

    it('Throws the first errors message if message is undefined', () => {
      const validator = new BaseValidator();
      const e1 = { message: 'e1' };
      const e2 = { message: 'e2' };
      validator._addError(e1)._addError(e2);

      expect(validator.throw.bind(validator)).to.throw(Error, 'e1');
    });

  });

  describe('valid', () => {

    it('Returns true if there are no errors', () => {
      const validator = new BaseValidator();

      expect(validator.valid()).to.be.true;
    });

    it('Returns false if there are errors', () => {
      const validator = new BaseValidator();
      validator._addError({})._addError({});

      expect(validator.valid()).to.be.false;
    });

  });

});
