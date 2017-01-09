const { expect }      = require('chai');
const { spy }         = require('sinon');
const ArrayValidator  = require('./Array');

describe('Validator / types / Array', () => {

  it('Is valid if given value is Array', () => {
    const value = [];
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new ArrayValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Is invalid if given value is null', () => {
    const value = null;
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is boolean', () => {
    const value = true;
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is number', () => {
    const value = 42;
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Is invalid if given type is object', () => {
    const value = {};
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is string', () => {
    const value = 'Hello World!';
    const validator = new ArrayValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('Array');
    expect(validator.errors()[0].actual).to.equal('string');
  });

  describe('between', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator(['My', 'Test', 'Array']);
    });

    it('Throws an Error if minLength is not of type number', () => {
      expect(validator.between.bind(validator, '2', 4)).to.throw(Error, 'ArrayValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if minLength is not an integer', () => {
      expect(validator.between.bind(validator, 2.3, 4)).to.throw(Error, 'ArrayValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not of type number', () => {
      expect(validator.between.bind(validator, 2, '4')).to.throw(Error, 'ArrayValidator.max: maxLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not an integer', () => {
      expect(validator.between.bind(validator, 2, 4.12)).to.throw(Error, 'ArrayValidator.max: maxLength is not a valid integer');
    });

    it('Returns itself', () => {
      expect(validator.between(2, 4)).to.be.an.instanceof(ArrayValidator);
      expect(validator.between(4, 2)).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if the length of value is between minLength and maxLength', () => {
      expect(validator.between(2, 4).valid()).to.be.true;
    });

    it('Is valid if the length of value is exactly minLength', () => {
      expect(validator.between(3, 4).valid()).to.be.true;
    });

    it('Is valid if the length of value is exactly maxLength', () => {
      expect(validator.between(2, 3).valid()).to.be.true;
    });

    it('Is invalid if the length of value is less than minLength', () => {
      expect(validator.between(4, 6).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.between(4, 6);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(4);
      expect(validator.errors()[0].actual).to.equal(3);
    });

    it('Is invalid if the length of value is greater than maxLength', () => {
      expect(validator.between(0, 2).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.between(0, 2);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(2);
      expect(validator.errors()[0].actual).to.equal(3);
    });

  });

  describe('contains', () => {

    it('Returns itself', () => {
      const validator = new ArrayValidator([1, 2, 3]);

      expect(validator.contains(1)).to.be.an.instanceof(ArrayValidator);
      expect(validator.contains('four')).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if the value contains a given boolean', () => {
      const validator = new ArrayValidator([true, true, false]);

      expect(validator.contains(true).valid()).to.be.true;
    });

    it('Is valid if the value contains a given number', () => {
      const validator = new ArrayValidator([1, 1, 2, 3, 5, 8, 13, 21]);

      expect(validator.contains(13).valid()).to.be.true;
    });

    it('Is valid if the value contains a given string', () => {
      const validator = new ArrayValidator(['one', 'two', 'three', 'four']);

      expect(validator.contains('two').valid()).to.be.true;
    });

    it('Is valid if the value contains a given object by reference', () => {
      const objRef = { title: 'myObject' };
      const value = [ objRef, { title: 'notMyObject' } ];
      const validator = new ArrayValidator(value);

      expect(validator.contains(objRef).valid()).to.be.true;
    });

    it('Is invalid if the value contains a given object by value', () => {
      const value = [ { title: 'myObject' }, { title: 'notMyObject' } ];
      const validator = new ArrayValidator(value);

      expect(validator.contains({ title: 'myObject' }).valid()).to.be.false;
    });

    it('Is invalid if the value does not contain given value', () => {
      const validator = new ArrayValidator([false, 'one', 2, { value: 3 }, [4, 5]]);

      expect(validator.contains(1).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new ArrayValidator([false, 'one', 2, { value: 3 }, [4, 5]]).contains(1);

      expect(validator.errors()[0].type).to.equal('contains');
      expect(validator.errors()[0].expected).to.equal(1);
      expect(validator.errors()[0].actual).to.equal('[false,one,2,[object Object],4,5]');
    });

  });

  describe('each', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator([1, 2, 3]);
      validator.forEach = spy();
    })

    it('Calls forEach', () => {
      validator.each(() => null);

      expect(validator.forEach.calledOnce).to.be.true;
    });

    it('passes fn to forEach', () => {
      const fn = () => undefined;
      validator.each(fn);

      expect(validator.forEach.calledWithExactly(fn)).to.be.true;
    });

  });

  describe('forEach', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator([1, 2, 3]);
    })

    it('Throws an Error if fn is not of type function', () => {
      expect(validator.forEach.bind(validator, {})).to.throw(Error, 'ArrayValidator.forEach: fn is not a function');
    });

    it('Returns itself', () => {
      expect(validator.forEach(() => undefined)).to.be.an.instanceof(ArrayValidator);
      expect(validator.forEach(() => 'error')).to.be.an.instanceof(ArrayValidator);
    });

    it('Calls fn value.length times', () => {
      const fn = spy();
      validator.forEach(fn);

      expect(fn.calledThrice).to.be.true;
    });

    it('Passes the arguments element, index and array to fn', () => {
      const fn = spy();
      validator.forEach(fn);

      expect(fn.calledWithExactly(1, 0, [1, 2, 3])).to.be.true;
      expect(fn.calledWithExactly(2, 1, [1, 2, 3])).to.be.true;
      expect(fn.calledWithExactly(3, 2, [1, 2, 3])).to.be.true;
    });

    it('Is valid if fn doesn\'t return any errors', () => {
      const fn = function () {

      };

      expect(validator.forEach(fn).valid()).to.be.true;
    });

    it('Is invalid if fn returns an error', () => {
      const fn = () => 'error';

      expect(validator.forEach(fn).valid()).to.be.false;
    });

    it('Sets an error for each time fn returns an error', () => {
      const fn = (element) => {
        if (element > 1) {
          return 'value is too large';
        }
      };

      validator.forEach(fn);

      expect(validator.errors().length).to.equal(2);
    });

    it('Sets the correct type, expected and actual for fn', () => {
      const fn = (element) => {
        if (element > 1) {
          return 'value is too large';
        }
      };

      validator.forEach(fn);

      expect(validator.errors()[0].type).to.equal('forEach');
      expect(validator.errors()[0].expected).to.equal(null);
      expect(validator.errors()[0].actual).to.equal(2);
      expect(validator.errors()[1].type).to.equal('forEach');
      expect(validator.errors()[1].expected).to.equal(null);
      expect(validator.errors()[1].actual).to.equal(3);
    });

  });

  describe('length', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator(['a', 'b', 'c']);
    });

    it('Throws an Error if length is not of type number', () => {
      expect(validator.length.bind(validator, '3')).to.throw(Error, 'ArrayValidator.length: length is not a valid integer');
    });

    it('Throws an Error if length is no integer', () => {
      expect(validator.length.bind(validator, 3.14)).to.throw(Error, 'ArrayValidator.length: length is not a valid integer');
    });

    it('Returns itself', () => {
      expect(validator.length(3)).to.be.an.instanceof(ArrayValidator);
      expect(validator.length(5)).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if length of the value is exactly length', () => {
      expect(validator.length(3).valid()).to.be.true;
    });

    it('Is invalid if length of the value is less than length', () => {
      expect(validator.length(4).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.length(4);

      expect(validator.errors()[0].type).to.equal('length');
      expect(validator.errors()[0].expected).to.equal(4);
      expect(validator.errors()[0].actual).to.equal(3);
    });

    it('Is invalid if length of the value is greater than length', () => {
      expect(validator.length(2).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.length(2);

      expect(validator.errors()[0].type).to.equal('length');
      expect(validator.errors()[0].expected).to.equal(2);
      expect(validator.errors()[0].actual).to.equal(3);
    });

  });

  describe('max', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator(['foo', 'bar', 'baz']);
    });

    it('Throws an Error if maxLength is not of type number', () => {
      expect(validator.max.bind(validator, '4')).to.throw(Error, 'ArrayValidator.max: maxLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not an integer', () => {
      expect(validator.max.bind(validator, 4.12)).to.throw(Error, 'ArrayValidator.max: maxLength is not a valid integer');
    });

    it('Returns itself', () => {
      expect(validator.max(4)).to.be.an.instanceof(ArrayValidator);
      expect(validator.max(2)).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if length of the value is less than maxLength', () => {
      expect(validator.max(4).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly maxLength', () => {
      expect(validator.max(3).valid()).to.be.true;
    });

    it('Is invalid if length of the value is greater than maxLength', () => {
      expect(validator.max(2).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.max(2);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(2);
      expect(validator.errors()[0].actual).to.equal(3);
    });

  });

  describe('min', () => {

    let validator;

    beforeEach(() => {
      validator = new ArrayValidator(['Tic', 'Tac', 'Toe']);
    });

    it('Throws an Error if minLength is not of type number', () => {
      expect(validator.min.bind(validator, '2')).to.throw(Error, 'ArrayValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if minLength is not an integer', () => {
      expect(validator.min.bind(validator, 2.5)).to.throw(Error, 'ArrayValidator.min: minLength is not a valid integer');
    });

    it('Returns itself', () => {
      expect(validator.min(2)).to.be.an.instanceof(ArrayValidator);
      expect(validator.min(4)).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if length of the value is greater than minLength', () => {
      expect(validator.min(2).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly minLength', () => {
      expect(validator.min(3).valid()).to.be.true;
    });

    it('Is invalid if length of the value is greater than minLength', () => {
      expect(validator.min(4).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.min(4);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(4);
      expect(validator.errors()[0].actual).to.equal(3);
    });

  });

  describe('of', () => {

    it('Throws an Error if type is not of type string', () => {
      const validator = new ArrayValidator([1, 2, 3]);

      expect(validator.of.bind(validator, Number)).to.throw(Error, 'ArrayValidator.of: type is not of type string');
    });

    it('Returns itself', () => {
      const validator = new ArrayValidator([1, 2, 3]);

      expect(validator.of('number')).to.be.an.instanceof(ArrayValidator);
      expect(validator.of('object')).to.be.an.instanceof(ArrayValidator);
    });

    it('Is valid if type is bool and all elements are boolean', () => {
      const validator = new ArrayValidator([true, false, true]);

      expect(validator.of('bool').valid()).to.be.true;
    });

    it('Is valid if type is boolean and all elements are boolean', () => {
      const validator = new ArrayValidator([true, false, true]);

      expect(validator.of('boolean').valid()).to.be.true;
    });

    it('Is valid if type is function and all elements are function', () => {
      const validator = new ArrayValidator([() => null, () => 2, () => 'something']);

      expect(validator.of('function').valid()).to.be.true;
    });

    it('Is valid if type is number and all elements are number', () => {
      const validator = new ArrayValidator([1, 2, 3]);

      expect(validator.of('number').valid()).to.be.true;
    });

    it('Is valid if type is object and all elements are object', () => {
      const validator = new ArrayValidator([{}, {}, {}]);

      expect(validator.of('object').valid()).to.be.true;
    });

    it('Is valid if type is string and all elements are string', () => {
      const validator = new ArrayValidator(['a', 'b', 'c']);

      expect(validator.of('string').valid()).to.be.true;
    });

    it('Is valid if type is array and all elements are array', () => {
      const validator = new ArrayValidator([[], [], []]);

      expect(validator.of('array').valid()).to.be.true;
    });

    it('Is invalid if one or more elements are not of given type and sets one error', () => {
      const validator = new ArrayValidator(['one', 2, 3]);

      expect(validator.of('string').valid()).to.be.false;
      expect(validator.errors().length).to.equal(1);
    });

    it('Is invalid if type is not one of above valid types', () => {
      const validator = new ArrayValidator([1, 2, 3]);

      expect(validator.of('integer').valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new ArrayValidator([1, 2, 3]).of('integer');

      expect(validator.errors()[0].type).to.equal('of');
      expect(validator.errors()[0].expected).to.equal('integer');
      expect(validator.errors()[0].actual).to.equal('[1,2,3]');
    });

    it('Accepts types in different casing', () => {
      const value = [1, 2, 3];
      const validator = new ArrayValidator(value);

      expect(validator.of('NuMbEr').valid()).to.be.true;
    });

  });

});
