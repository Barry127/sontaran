const { expect }      = require('chai');
const { spy }         = require('sinon');
const ArrayValidator  = require('./Array');

describe('Validator / types / Array', () => {

  it('Returns itself if given value is Array', () => {
    const value = [];
    const validator = new ArrayValidator(value);

    expect(validator).to.be.an.instanceof(ArrayValidator);
  });

  it('Throws a TypeError if given value is undefined', () => {
    const createValidator = () => {
      return new ArrayValidator();
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const createValidator = () => {
      return new ArrayValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is boolean', () => {
    const value = true;
    const createValidator = () => {
      return new ArrayValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is number', () => {
    const value = 42;
    const createValidator = () => {
      return new ArrayValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is object', () => {
    const value = {};
    const createValidator = () => {
      return new ArrayValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is string', () => {
    const value = '[Object Array]';
    const createValidator = () => {
      return new ArrayValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  describe('between', () => {

    const value = [ 'My', 'Test', 'Array' ];
    const validator = new ArrayValidator(value);

    it('Throws a TypeError if minLength is not of type number', () => {
      expect(validator.between.bind(validator, '2', 4)).to.throw(TypeError);
    });

    it('Throws an Error if minLength is no integer', () => {
      expect(validator.between.bind(validator, 2.5, 4)).to.throw(Error);
    });

    it('Throws a TypeError if maxLength is not of type number', () => {
      expect(validator.between.bind(validator, 2, '4')).to.throw(TypeError);
    });

    it('Throws an Error if maxLength is no integer', () => {
      expect(validator.between.bind(validator, 2, 4.3)).to.throw(Error);
    });

    it('Throws an Error if minLength is greater than maxLength', () => {
      expect(validator.between.bind(validator, 4, 2)).to.throw(Error);
    });

    it('Returns itself if the length of the value array is between minLength and maxLength', () => {
      expect(validator.between(2, 4)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if the length of the value array is exactly minLength', () => {
      expect(validator.between(3, 4)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if the length of the value array is exactly maxLength', () => {
      expect(validator.between(2, 3)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if the length of the value array is less than minLength', () => {
      expect(validator.between.bind(validator, 4, 5)).to.throw(Error);
    });

    it('Throws an error if the length of the value array is greater than maxLength', () => {
      expect(validator.between.bind(validator, 1, 2)).to.throw(Error);
    });

  });

  describe('contains', () => {

    it('Returns itself if array contains given boolean value', () => {
      const value = [ true, true, false ];
      const validator = new ArrayValidator(value);

      expect(validator.contains(false)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if array contains given number value', () => {
      const value = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
      const validator = new ArrayValidator(value);

      expect(validator.contains(13)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if array contains given string value', () => {
      const value = [ 'one', 'two', 'three', 'four' ];
      const validator = new ArrayValidator(value);

      expect(validator.contains('two')).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if array contains given object value by reference', () => {
      const objRef = { title: 'myObject' };
      const value = [ objRef, { title: 'notMyObject' } ];
      const validator = new ArrayValidator(value);

      expect(validator.contains(objRef)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if array contains given object by value', () => {
      const value = [ { title: 'myObject' }, { title: 'notMyObject' } ];
      const validator = new ArrayValidator(value);

      expect(validator.contains.bind(validator, { title: 'myObject' })).to.throw(Error);
    });

    it('Returns itself if array contains given array value by reference', () => {
      const arrRef = [ 1, 2 ];
      const value = [ arrRef, [ 3, 4 ] ];
      const validator = new ArrayValidator(value);

      expect(validator.contains(arrRef)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if array contains given array by value', () => {
      const value = [ [ 1, 2 ], [ 3, 4 ] ];
      const validator = new ArrayValidator(value);

      expect(validator.contains.bind(validator, [ 1, 2 ])).to.throw(Error);
    });

    it('Throws an Error if array doesn\'t contain given value', () => {
      const value = [ false, 'one', 2, { value: 3 }, [ 4, 5 ] ];
      const validator = new ArrayValidator(value);

      expect(validator.contains.bind(validator, 1)).to.throw(Error);
    });

  });

  describe('forEach', () => {

    it('Throws a TypeError if fn is not of type function', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.forEach.bind(validator, {})).to.throw(TypeError);
    });

    it('Returns itself if fn doesn\'t throw an Error', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.forEach(() => null)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an error if fn throws an Error', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);
      const fn = () => {
        throw new Error('fn throws an Error');
      };

      expect(validator.forEach.bind(validator, fn)).to.throw(Error);
    });

    it('Calls fn the length of value times', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);
      const fn = spy();
      validator.forEach(fn);

      expect(fn.calledThrice).to.be.ok;
    });

    it('Passes the arguments to fn', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);
      const fn = spy();
      validator.forEach(fn);

      expect(fn.calledWithExactly(1, 0, value)).to.be.ok;
      expect(fn.calledWithExactly(2, 1, value)).to.be.ok;
      expect(fn.calledWithExactly(3, 2, value)).to.be.ok;
    });

    it('each is a shortcut for forEach', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);
      validator.forEach = spy();
      validator.each(() => null);

      expect(validator.forEach.calledOnce).to.be.ok;
    });

  });

  describe('length', () => {

    const value = [ 'a', 'b', 'c' ];
    const validator = new ArrayValidator(value);

    it('Throws a TypeError if length is not of type number', () => {
      expect(validator.length.bind(validator, '3')).to.throw(TypeError);
    });

    it('Throws an Error if length is no integer', () => {
      expect(validator.length.bind(validator, 3.2)).to.throw(Error);
    });

    it('Returns itself if the length of the value array is exactly length', () => {
      expect(validator.length(3)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if the length of the value array is less than length', () => {
      expect(validator.length.bind(validator, 4)).to.throw(Error);
    });

    it('Throws an Error if the length of the value array is greater than length', () => {
      expect(validator.length.bind(validator, 2)).to.throw(Error);
    });

  });

  describe('max', () => {

    const value = [ 'foo', 'bar', 'baz' ];
    const validator = new ArrayValidator(value);

    it('Throws a TypeError if maxLength is not of type number', () => {
      expect(validator.max.bind(validator, '3')).to.throw(TypeError);
    });

    it('Throws an Error if maxLength is no integer', () => {
      expect(validator.max.bind(validator, 3.14)).to.throw(Error);
    });

    it('Returns itself if the length of the value is less than maxLength', () => {
      expect(validator.max(5)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if the length of the value is exactly maxLength', () => {
      expect(validator.max(3)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if the length of the value is greater than maxLength', () => {
      expect(validator.max.bind(validator, 2)).to.throw(Error);
    });

  });

  describe('min', () => {

    const value = [ 'Tic', 'Tac', 'Toe' ];
    const validator = new ArrayValidator(value);

    it('Throws a TypeError if minLength is not of type number', () => {
      expect(validator.min.bind(validator, '3')).to.throw(TypeError);
    });

    it('Throws an Error if minLength is no integer', () => {
      expect(validator.min.bind(validator, 3.14)).to.throw(Error);
    });

    it('Returns itself if the length of the value array is greater than minLength', () => {
      expect(validator.min(2)).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if the length if the value array is exactly minLength', () => {
      expect(validator.min(3)).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws an Error if the length if the value array is less than minLength', () => {
      expect(validator.min.bind(validator, 4)).to.throw(Error);
    });

  });

  describe('of', () => {

    it('Throws a TypeError if type is not of type string', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.of.bind(validator, Number)).to.throw(TypeError);
    });

    it('Returns itself if type is boolean and all elements are boolean', () => {
      const value = [ true, false, true ];
      const validator = new ArrayValidator(value);

      expect(validator.of('boolean')).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if type is number and all elements are number', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.of('number')).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if type is object and all elements are object', () => {
      const value = [ {}, {}, {} ];
      const validator = new ArrayValidator(value);

      expect(validator.of('object')).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if type is string and all elements are string', () => {
      const value = [ 'a', 'b', 'c' ];
      const validator = new ArrayValidator(value);

      expect(validator.of('string')).to.be.an.instanceof(ArrayValidator);
    });

    it('Returns itself if type is array and all elements are array', () => {
      const value = [ [ true, false, true ], [ 1, 2, 3 ] ];
      const validator = new ArrayValidator(value);

      expect(validator.of('array')).to.be.an.instanceof(ArrayValidator);
    });

    it('Throws a TypeError if an element is not of given type', () => {
      const value = [ 1, 2, 'three' ];
      const validator = new ArrayValidator(value);

      expect(validator.of.bind(validator, 'number')).to.throw(Error);
    });

    it('Throws an Error if type is not one of above', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.of.bind(validator, 'digit')).to.throw(Error);
    });

    it('Accepts types in different casing', () => {
      const value = [ 1, 2, 3 ];
      const validator = new ArrayValidator(value);

      expect(validator.of('NuMbEr')).to.be.an.instanceof(ArrayValidator);
    });

  });

});
