const { expect }        = require('chai');
const BooleanValidator  = require('./Boolean');

describe('Validator / types / Boolean', () => {

  it('is valid if given value is of type boolean', () => {
    const value = true;
    const validator = new BooleanValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Throws a TypeError if given value is undefined', () => {
    const validator = new BooleanValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('boolean');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const validator = new BooleanValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('boolean');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Throws a TypeError if given type is number', () => {
    const value = 42;
    const validator = new BooleanValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('boolean');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Throws a TypeError if given type is object', () => {
    const value = {};
    const validator = new BooleanValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('boolean');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Throws a TypeError if given type is string', () => {
    const value = 'Hello World!';
    const validator = new BooleanValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('boolean');
    expect(validator.errors()[0].actual).to.equal('string');
  });

  describe('equals', () => {

    it('Returns itself', () => {
      const validator = new BooleanValidator(true);

      expect(validator.equals(true)).to.be.an.instanceof(BooleanValidator);
      expect(validator.equals(false)).to.be.an.instanceof(BooleanValidator);
    });

    it('Throws an Error if query is not of type boolean', () => {
      const validator = new BooleanValidator(true);

      expect(validator.equals.bind(validator, 1)).to.throw(Error, 'BooleanValidator.equals: query is not of type boolean');
    });

    it('Is valid if the value is equals query', () => {
      const validator = new BooleanValidator(true);

      expect(validator.equals(true).valid()).to.be.true;
    });

    it('Is invalid if the value does not equal query', () => {
      const validator = new BooleanValidator(true);

      expect(validator.equals(false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new BooleanValidator(false);
      validator.equals(true);

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal(true);
      expect(validator.errors()[0].actual).to.equal(false);
    });

  });

  describe('false', () => {

    it('Returns itself', () => {
      const falseValidator = new BooleanValidator(false);
      const trueValidator = new BooleanValidator(true);

      expect(falseValidator.false()).to.be.an.instanceof(BooleanValidator);
      expect(trueValidator.false()).to.be.an.instanceof(BooleanValidator);
    });

    it('Is valid if the value is false', () => {
      const validator = new BooleanValidator(false);

      expect(validator.false().valid()).to.be.true;
    });

    it('Is invalid if the value is true', () => {
      const validator = new BooleanValidator(true);

      expect(validator.false().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to error', () => {
      const validator = new BooleanValidator(true);
      validator.false();

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal(false);
      expect(validator.errors()[0].actual).to.equal(true);
    });

  });

  describe('true', () => {

    it('Returns itself', () => {
      const falseValidator = new BooleanValidator(false);
      const trueValidator = new BooleanValidator(true);

      expect(falseValidator.true()).to.be.an.instanceof(BooleanValidator);
      expect(trueValidator.true()).to.be.an.instanceof(BooleanValidator);
    });

    it('Is valid if the value is true', () => {
      const validator = new BooleanValidator(true);

      expect(validator.true().valid()).to.be.true;
    });

    it('Is invalid if the value is false', () => {
      const validator = new BooleanValidator(false);

      expect(validator.true().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to error', () => {
      const validator = new BooleanValidator(false);
      validator.true();

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal(true);
      expect(validator.errors()[0].actual).to.equal(false);
    });

  });

});