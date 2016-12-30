const { expect }      = require('chai');
const { spy }         = require('sinon');
const NumberValidator = require('./Number');

describe('Validator / types / Number', () => {

  it('Returns itself if given value type is number', () => {
    const value = 42;
    const validator = new NumberValidator(value);

    expect(validator).to.be.an.instanceof(NumberValidator);
  });

  it('Throws a TypeError if given value is undefined', () => {
    const createValidator = () => {
      return new NumberValidator();
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const createValidator = () => {
      return new NumberValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is boolean', () => {
    const value = false;
    const createValidator = () => {
      return new NumberValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is object', () => {
    const value = {};
    const createValidator = () => {
      return new NumberValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is string', () => {
    const value = '3';

    const createValidator = () => {
      return new NumberValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  describe('between', () => {
    const validator = new NumberValidator(4);

    it('Throws a TypeError if minValue is not of type number', () => {
      expect(validator.between.bind(validator, '3', 5)).to.throw(TypeError);
    });

    it('Throws an Error if minValue is NaN', () => {
      expect(validator.between.bind(validator, Number.NaN, 5)).to.throw(Error);
    });

    it('Throws a TypeError if maxValue is not of type number', () => {
      expect(validator.between.bind(validator, 3, '5')).to.throw(TypeError);
    });

    it('Throws an Error if maxValue is NaN', () => {
      expect(validator.between.bind(validator, 3, Number.NaN)).to.throw(Error);
    });

    it('Throws a TypeError if inclusive is not of type boolean', () => {
      expect(validator.between.bind(validator, 3, 5, 'true')).to.throw(TypeError);
    });

    it('Throws an Error if minValue is greater than maxValue', () => {
      expect(validator.between.bind(validator, 5, 3)).to.throw(Error);
    });

    it('Returns itself if the value is between minValue and maxValue', () => {
      expect(validator.between(3, 5)).to.be.an.instanceof(NumberValidator);
    });

    it('Returns itself is the value is exactly minValue and inclusive is true', () => {
      expect(validator.between(4, 5, true)).to.be.an.instanceof(NumberValidator);
    });

    it('Returns itself if the value is exactly maxValue and inclusive is true', () => {
      expect(validator.between(3, 4, true)).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if the value is exactly minValue and inclusive is false', () => {
      expect(validator.between.bind(validator, 4, 5, false)).to.throw(Error);
    });

    it('Throws an Error if the value is exactly maxValue and inclusive is false', () => {
      expect(validator.between.bind(validator, 3, 4, false)).to.throw(Error);
    });

    it('Throws an Error if the value is outside minValue and maxValue', () => {
      expect(validator.between.bind(validator, 7, 9, true)).throw(Error);
      expect(validator.between.bind(validator, 0, 2, true)).throw(Error);
      expect(validator.between.bind(validator, 7, 9, false)).throw(Error);
      expect(validator.between.bind(validator, 0, 2, false)).throw(Error);
    });
  });

  describe('equals', () => {

    const value = 2.718;
    const validator = new NumberValidator(value);

    it('Throws a TypeError if checkValue is not of type number', () => {
      expect(validator.equals.bind(validator, '2.718')).to.throw(TypeError);
    });

    it('Returns itself if checkValue equals the value', () => {
      expect(validator.equals(2.718)).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if checkValue is not equal to the value', () => {
      expect(validator.equals.bind(validator, 3)).to.throw(Error);
    });

    it('Throws an Error comparing NaN to NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.equals.bind(validator, Number.NaN)).to.throw(Error);
    });

  });

  describe('integer', () => {

    it('Returns itself if the value is an integer', () => {
      const value = 42;
      const validator = new NumberValidator(value);

      expect(validator.integer()).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if the value is a float', () => {
      const value = 3.14;
      const validator = new NumberValidator(value);

      expect(validator.integer.bind(validator)).to.throw(Error);
    });

    it('Throws an Error if the value is an integer outside the save integer range', () => {
      const highValue   = Math.pow(2, 53);
      const lowValue    = -(Math.pow(2, 53));
      const validator1  = new NumberValidator(highValue);
      const validator2  = new NumberValidator(lowValue);

      expect(validator1.integer.bind(validator1)).to.throw(Error);
      expect(validator2.integer.bind(validator2)).to.throw(Error);
    });

    it('Throws an Error if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.integer).to.throw(Error);
    });

    it('int is a shortcut for integer', () => {
      const value = 127;
      const validator = new NumberValidator(value);
      validator.integer = spy();
      validator.int();

      expect(validator.integer.calledOnce).to.be.ok;
    });

  });

  describe('max', () => {

    const validator = new NumberValidator(12.3);

    it('Throws a TypeError if maxValue is not of type number', () => {
      expect(validator.max.bind(validator, '13')).to.throw(TypeError);
    });

    it('Throws an Error if maxValue is NaN', () => {
      expect(validator.max.bind(validator, Number.NaN)).to.throw(Error);
    });

    it('Returns itself if maxValue is greater than the value', () => {
      expect(validator.max(13)).to.be.an.instanceof(NumberValidator);
    });

    it('Returns intself if maxValue is exactly the value', () => {
      expect(validator.max(12.3)).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if maxValue is less than the value', () => {
      expect(validator.max.bind(validator, 12)).to.throw(Error);
    });

  });

  describe('min', () => {

    const validator = new NumberValidator(12.3);

    it('Throws a TypeError if minValue is not of type number', () => {
      expect(validator.min.bind(validator, '13')).to.throw(TypeError);
    });

    it('Throws an Error if minValue is NaN', () => {
      expect(validator.min.bind(validator, Number.NaN)).to.throw(Error);
    });

    it('Returns itself if minValue is less than the value', () => {
      expect(validator.min(12)).to.be.an.instanceof(NumberValidator);
    });

    it('Returns itself if minValue is exactly the value', () => {
      expect(validator.min(12.3)).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if minValue is greater than the value', () => {
      expect(validator.min.bind(validator, 13)).to.throw(Error);
    });

  });

  describe('NaN', () => {

    it('Returns itself if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.NaN()).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if the value is a valid number', () => {
      const value = 64;
      const validator = new NumberValidator(value);

      expect(validator.NaN.bind(validator)).to.throw(Error);
    });

    it('naN is a shortcut for NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);
      validator.NaN = spy();
      validator.naN();

      expect(validator.NaN.calledOnce).to.be.ok;
    });

    it('nan is a shortcut for NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);
      validator.NaN = spy();
      validator.nan();

      expect(validator.NaN.calledOnce).to.be.ok;
    });

  });

  describe('notNaN', () => {

    it('Returns itself if the value is valid number', () => {
      const value = Math.PI;
      const validator = new NumberValidator(value);

      expect(validator.notNaN()).to.be.an.instanceof(NumberValidator);
    });

    it('Throws an Error if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.notNaN.bind(validator)).to.throw(Error);
    });

    it('notNan is a shortcut for notNaN', () => {
      const value = 1;
      const validator = new NumberValidator(value);
      validator.notNaN = spy();
      validator.notNan();

      expect(validator.notNaN.calledOnce).to.be.ok;
    });

  });

});
