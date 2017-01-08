const { expect }      = require('chai');
const { spy }         = require('sinon');
const NumberValidator = require('./Number');

describe.only('Validator / types / Number', () => {

  it('Is valid if given value is of type number', () => {
    const value = 42;
    const validator = new NumberValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new NumberValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('number');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Is invalid if given value is null', () => {
    const value = null;
    const validator = new NumberValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('number');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is boolean', () => {
    const value = false;
    const validator = new NumberValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('number');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is object', () => {
    const value = {};
    const validator = new NumberValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('number');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is string', () => {
    const value = '3';
    const validator = new NumberValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('number');
    expect(validator.errors()[0].actual).to.equal('string');
  });

  describe('between', () => {

    it('Throws an Error if minValue is not of type number', () => {
      const validator = new NumberValidator(4);

      expect(validator.between.bind(validator, '3', 5)).to.throw(Error, 'NumberValidator.between: minValue is not a valid number');
    });

    it('Throws an Error if minValue is NaN', () => {
      const validator = new NumberValidator(4);

      expect(validator.between.bind(validator, Number.NaN, 5)).to.throw(Error, 'NumberValidator.between: minValue is not a valid number');
    });

    it('Throws a TypeError if maxValue is not of type number', () => {
      const validator = new NumberValidator(4);

      expect(validator.between.bind(validator, 3, '5')).to.throw(Error, 'NumberValidator.between: maxValue is not a valid number');
    });

    it('Throws an Error if maxValue is NaN', () => {
      const validator = new NumberValidator(4);

      expect(validator.between.bind(validator, 3, Number.NaN)).to.throw(Error, 'NumberValidator.between: maxValue is not a valid number');
    });

    it('Throws an Error if inclusive is not of type boolean', () => {
      const validator = new NumberValidator(4);

      expect(validator.between.bind(validator, 3, 5, 'true')).to.throw(Error, 'NumberValidator.between: inclusive is not of type boolean');
    });

    it('Returns itself', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(3, 5)).to.be.an.instanceof(NumberValidator);
      expect(validator.between(5, 3)).to.be.an.instanceof(NumberValidator);

    });

    it('Is valid if the value is between minValue and maxValue and inclusive is false', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(3, 5, false).valid()).to.be.true;
    });

    it('Is valid if the value is between minValue and maxValue and inclusive is true', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(3, 5, true).valid()).to.be.true;
    });

    it('Is valid if the value is exactly minValue and inclusive is true', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(4, 5, true).valid()).to.be.true;
    });

    it('Is valid if the value is exactly maxValue and inclusive is true', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(3, 4, true).valid()).to.be.true;
    });

    it('Is invalid if the value is exactly minValue and inclusive is false', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(4, 5, false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(4, 5, false);

      expect(validator.errors()[0].type).to.equal('greaterThan');
      expect(validator.errors()[0].expected).to.equal('> 4');
      expect(validator.errors()[0].actual).to.equal(4);
    });

    it('Is invalid if the value is exactly maxValue and inclusive is false', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(3, 4, false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(3, 4, false);

      expect(validator.errors()[0].type).to.equal('lessThan');
      expect(validator.errors()[0].expected).to.equal('< 4');
      expect(validator.errors()[0].actual).to.equal(4);
    });

    it('Is invalid if the value is less than minValue and inclusive is true', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(7, 9, true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(7, 9, true);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(7);
      expect(validator.errors()[0].actual).to.equal(4);
    });

    it('Is invalid if the value is less than minValue and inclusive is false', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(7, 9, false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(7, 9, false);

      expect(validator.errors()[0].type).to.equal('greaterThan');
      expect(validator.errors()[0].expected).to.equal('> 7');
      expect(validator.errors()[0].actual).to.equal(4);
    });

    it('Is invalid if the value is greater than maxValue and inclusive is true', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(1, 3, true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(1, 3, true);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(3);
      expect(validator.errors()[0].actual).to.equal(4);
    });

    it('Is invalid if the value is greater than maxValue and inclusive is false', () => {
      const validator = new NumberValidator(4);

      expect(validator.between(1, 3, false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      const validator = new NumberValidator(4);
      validator.between(1, 3, false);

      expect(validator.errors()[0].type).to.equal('lessThan');
      expect(validator.errors()[0].expected).to.equal('< 3');
      expect(validator.errors()[0].actual).to.equal(4);
    });
  });

  describe('equals', () => {

    it('Throws an Error if checkValue is not of type number', () => {
      const value = 2.718;
      const validator = new NumberValidator(value);

      expect(validator.equals.bind(validator, '2.718')).to.throw(Error, 'NumberValidator.equals: checkValue is not of type number');
    });

    it('Returns itself', () => {
      const value = 2.718;
      const validator = new NumberValidator(value);

      expect(validator.equals(2.718)).to.be.an.instanceof(NumberValidator);
      expect(validator.equals(3.14)).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value equals checkValue', () => {
      const value = 2.718;
      const validator = new NumberValidator(value);

      expect(validator.equals(2.718).valid()).to.be.true;
    });

    it('Is invalid if the value is not equal to checkValue', () => {
      const value = 2.718;
      const validator = new NumberValidator(value);

      expect(validator.equals(3).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 2.718;
      const validator = new NumberValidator(value);
      validator.equals(3);

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal(3);
      expect(validator.errors()[0].actual).to.equal(2.718);
    });

    it('Is invalid if the value and checkValue are both NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.equals(Number.NaN).valid()).to.be.false;
    });

  });

  describe('greaterThan', () => {

    it('Throws an Error if gtValue is not of type number', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan.bind(validator, '3')).to.throw(Error, 'NumberValidator.greaterThan: gtValue is not a valid number');
    });

    it('Throws an Error if gtValue is NaN', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan.bind(validator, Number.NaN)).to.throw(Error, 'NumberValidator.greaterThan: gtValue is not a valid number');
    });

    it('Returns itself', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan(3)).to.be.an.instanceof(NumberValidator);
      expect(validator.greaterThan(5)).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is greater than gtValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan(3).valid()).to.be.true;
    });

    it('Is invalid if the value is exactly gtValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan(4).valid()).to.be.false;
    });

    it('Is invalid if the value is less than gtValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.greaterThan(5).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 4;
      const validator = new NumberValidator(value);
      validator.greaterThan(5);

      expect(validator.errors()[0].type).to.equal('greaterThan');
      expect(validator.errors()[0].expected).to.equal('> 5');
      expect(validator.errors()[0].actual).to.equal(4);
    });

  });

  describe('int', () => {

    it('Calls integer', () => {
      const validator = new NumberValidator(42);
      validator.integer = spy();
      validator.int();

      expect(validator.integer.calledOnce).to.be.true;
    });

  });

  describe('integer', () => {

    it('Returns itself', () => {
      const value = 42;
      const validator = new NumberValidator(value);

      expect(validator.integer()).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is an integer', () => {
      const value = 42;
      const validator = new NumberValidator(value);

      expect(validator.integer().valid()).to.be.true;
    });

    it('Is invalid if the value is a float', () => {
      const value = 3.14;
      const validator = new NumberValidator(value);

      expect(validator.integer().valid()).to.be.false;
    });

    it('Is invalid if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.integer().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 3.14;
      const validator = new NumberValidator(value).integer();

      expect(validator.errors()[0].type).to.equal('integer');
      expect(validator.errors()[0].expected).to.equal(3);
      expect(validator.errors()[0].actual).to.equal(3.14);
    });

  });

  describe('lessThan', () => {

    it('Throws an Error if ltValue is not of type number', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan.bind(validator, '5')).to.throw(Error, 'NumberValidator.lessThan: ltValue is not a valid number');
    });

    it('Throws an Error if ltValue is NaN', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan.bind(validator, Number.NaN)).to.throw(Error, 'NumberValidator.lessThan: ltValue is not a valid number');
    });

    it('Returns itself', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan(3)).to.be.an.instanceof(NumberValidator);
      expect(validator.lessThan(5)).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is less than ltValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan(5).valid()).to.be.true;
    });

    it('Is invalid if the value is exactly ltValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan(4).valid()).to.be.false;
    });

    it('Is invalid if the value is greater than ltValue', () => {
      const value = 4;
      const validator = new NumberValidator(value);

      expect(validator.lessThan(3).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 4;
      const validator = new NumberValidator(value);
      validator.lessThan(3);

      expect(validator.errors()[0].type).to.equal('lessThan');
      expect(validator.errors()[0].expected).to.equal('< 3');
      expect(validator.errors()[0].actual).to.equal(4);
    });

  });

  describe('max', () => {

    it('Throws an Error if maxValue is not of type number', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max.bind(validator, '14')).to.throw(Error, 'NumberValidator.max: maxValue is not a valid number');
    });

    it('Throws an Error if maxValue is NaN', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max.bind(validator, Number.NaN)).to.throw(Error, 'NumberValidator.max: maxValue is not a valid number');
    });

    it('Returns itself', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max(12)).to.be.an.instanceof(NumberValidator);
      expect(validator.max(14)).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is less than maxValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max(14).valid()).to.be.true;
    });

    it('Is valid if the value is exactly maxValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max(13).valid()).to.be.true;
    });

    it('Is invalid if the value is greater than maxValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.max(12.3).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 13;
      const validator = new NumberValidator(value).max(12.3);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(12.3);
      expect(validator.errors()[0].actual).to.equal(13);
    });

  });

  describe('min', () => {

    it('Throws an Error if maxValue is not of type number', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min.bind(validator, '12')).to.throw(Error, 'NumberValidator.min: minValue is not a valid number');
    });

    it('Throws an Error if maxValue is NaN', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min.bind(validator, Number.NaN)).to.throw(Error, 'NumberValidator.min: minValue is not a valid number');
    });

    it('Returns itself', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min(12)).to.be.an.instanceof(NumberValidator);
      expect(validator.min(14)).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is greater than minValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min(12).valid()).to.be.true;
    });

    it('Is valid if the value is exactly minValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min(13).valid()).to.be.true;
    });

    it('Is invalid if the value is less than minValue', () => {
      const value = 13;
      const validator = new NumberValidator(value);

      expect(validator.min(14).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 13;
      const validator = new NumberValidator(value).min(14);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(14);
      expect(validator.errors()[0].actual).to.equal(13);
    });

  });

  describe('NaN', () => {

    it('Returns itself', () => {
      const validator = new NumberValidator(Number.NaN);

      expect(validator.NaN()).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.NaN().valid()).to.be.true;
    });

    it('Is invalid if the value is a valid number', () => {
      const value = 42;
      const validator = new NumberValidator(value);

      expect(validator.NaN().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 3.14;
      const validator = new NumberValidator(value);
      validator.NaN();

      expect(validator.errors()[0].type).to.equal('NaN');
      expect(validator.errors()[0].expected).to.be.NaN;
      expect(validator.errors()[0].actual).to.equal(3.14);
    });

  });

  describe('naN', () => {

    it('Calls NaN', () => {
      const validator = new NumberValidator(Number.NaN);
      validator.NaN = spy();
      validator.naN();

      expect(validator.NaN.calledOnce).to.be.true;
    });

  });

  describe('nan', () => {

    it('Calls NaN', () => {
      const validator = new NumberValidator(Number.NaN);
      validator.NaN = spy();
      validator.nan();

      expect(validator.NaN.calledOnce).to.be.true;
    });

  });

  describe('notNaN', () => {

    it('Returns itself', () => {
      const validator = new NumberValidator(42);

      expect(validator.notNaN()).to.be.an.instanceof(NumberValidator);
    });

    it('Is valid if the value is a valid number', () => {
      const value = 3.14;
      const validator = new NumberValidator(value);

      expect(validator.notNaN().valid()).to.be.true;
    });

    it('Is invalid if the value is NaN', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);

      expect(validator.notNaN().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = Number.NaN;
      const validator = new NumberValidator(value);
      validator.notNaN();

      expect(validator.errors()[0].type).to.equal('notNaN');
      expect(validator.errors()[0].expected).to.equal('not NaN');
      expect(validator.errors()[0].actual).to.be.NaN;
    });

  });

  describe('notNan', () => {

    it('Calls notNaN', () => {
      const validator = new NumberValidator(42);
      validator.notNaN = spy();
      validator.notNan();

      expect(validator.notNaN.calledOnce).to.be.true;
    })

  });

});
