const { expect }        = require('chai');
const BooleanValidator  = require('./Boolean');

describe('Validator / types / Boolean', () => {

  it('Returns itself if given value type is boolean', () => {
    const value = true;
    const validator = new BooleanValidator(value);

    expect(validator).to.be.an.instanceof(BooleanValidator);
  });

  it('Throws a TypeError if given value is undefined', () => {
    const createValidator = () => {
      return new BooleanValidator();
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const createValidator = () => {
      return new BooleanValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is number', () => {
    const value = 42;
    const createValidator = () => {
      return new BooleanValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is object', () => {
    const value = {};
    const createValidator = () => {
      return new BooleanValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is string', () => {
    const value = 'Sonic Screwdriver';
    const createValidator = () => {
      return new BooleanValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  describe('false', () => {

    it('Returns itself if the value is false', () => {
      const value = false;
      const validator = new BooleanValidator(value);

      expect(validator.false()).to.be.an.instanceof(BooleanValidator);
    });

    it('Throws an Error if the value is true', () => {
      const value = true;
      const validator = new BooleanValidator(value);

      expect(validator.false.bind(validator)).to.throw(Error);
    });

  });

  describe('true', () => {

    it('Returns itself if the value is true', () => {
      const value = true;
      const validator = new BooleanValidator(value);

      expect(validator.true()).to.be.an.instanceof(BooleanValidator);
    });

    it('Throws an Error if the value is false', () => {
      const value = false;
      const validator = new BooleanValidator(value);

      expect(validator.true.bind(validator)).to.throw(Error);
    });

  });

});