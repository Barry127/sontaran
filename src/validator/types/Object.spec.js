const { expect }      = require('chai');
const { spy }         = require('sinon');
const ObjectValidator = require('./Object');

describe('Validator / types / Object', () => {

  it('Is valid if given value is of type object', () => {
    const value = {};
    const validator = new ObjectValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new ObjectValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('object');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Is valid if given value is null', () => {
    const value = null;
    const validator = new ObjectValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given type is boolean', () => {
    const value = true;
    const validator = new ObjectValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('object');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is number', () => {
    const value = 42;
    const validator = new ObjectValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('object');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Is invalid if given type is string', () => {
    const value = 'Hello World!';
    const validator = new ObjectValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('object');
    expect(validator.errors()[0].actual).to.equal('string');
  });

  describe('hasOwnProperty', () => {

    let validator;

    beforeEach(() => {
      validator = new ObjectValidator({
        a: 1,
        b: 2
      });
    })

    it('Returns itself', () => {
      expect(validator.hasOwnProperty('a')).to.be.an.instanceof(ObjectValidator);
      expect(validator.hasOwnProperty('c')).to.be.an.instanceof(ObjectValidator);
    });

    it('Is valid if given object has own property key', () => {
      expect(validator.hasOwnProperty('a').valid()).to.be.true;
    });

    it('Is invalid if given object does not have own property key', () => {
      expect(validator.hasOwnProperty('c').valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.hasOwnProperty('c');

      expect(validator.errors()[0].type).to.equal('hasOwnProperty');
      expect(validator.errors()[0].expected).to.equal('c');
      expect(validator.errors()[0].actual).to.equal(undefined);
    });

  });

  describe('key', () => {

    let validator;

    beforeEach(() => {
      validator = new ObjectValidator({
        pi: Math.PI,
        welcome: 'Hello World!'
      });
    });

    it('Throws an Error if validateFn is not of type function', () => {
      expect(validator.key.bind(validator, 'pi', {})).to.throw(Error, 'ObjectValidator.key: validateFn is not a function');
    });

    it('Throws an Error if validateFn does not return a validator', () => {
      expect(validator.key.bind(validator, 'pi', () => null)).to.throw(Error, 'ObjectValidator.key: validateFn for pi does not return a valid Validator');
    });

    it('Returns itself', () => {
      expect(validator.key('pi', (v) => v.number())).to.be.an.instanceof(ObjectValidator);
      expect(validator.key('welcome', (v) => v.boolean())).to.be.an.instanceof(ObjectValidator);
    });

    it('Is valid if the key is valid according to the validateFn function', () => {
      expect(validator.key('pi', (v) => v.number().lessThan(4)).valid()).to.be.true;
      expect(validator.key('welcome', (v) => v.string().startsWith('Hello')).valid()).to.be.true;
    });

    it('Is valid if a non required field is not there', () => {
      expect(validator.key('notThere', (v) => v.string().min(3)).valid()).to.be.true;
    });

    it('Is invalid if the key is invalid according to the validateFn function', () => {
      expect(validator.key('pi', (v) => v.number().integer()).valid()).to.be.false;
    });

    it('Is invalid if a required field is not there', () => {
      expect(validator.key('notThere', (v) => v.string().min(3).required()).valid()).to.be.false;
    })

    it('Sets the correct type, expected and actual to the error', () => {
      validator.key('welcome', (v) => v.string().uppercase().max(3));

      expect(validator.errors()[0].type).to.equal('key');
      expect(validator.errors()[0].expected).to.equal('welcome');
      expect(validator.errors()[0].actual.length).to.equal(2);
      expect(validator.errors()[0].actual[0].type).to.equal('uppercase');
      expect(validator.errors()[0].actual[1].type).to.equal('max');
    });

  });

  describe('keys', () => {

    let validator;

    beforeEach(() => {
      validator = new ObjectValidator({
        foo: 1,
        bar: true,
        baz: 'Hello World!'
      });
    });

    it('Throws an Error if keyList is not of type object', () => {
      expect(validator.keys.bind(validator, 'aaa')).to.throw(Error, 'ObjectValidator.keys: keyList is not of type object');
    });

    it('Returns itself', () => {
      expect(validator.keys({
        foo: (v) => v.number().integer().required(),
        bar: (v) => v.boolean().true().required()
      })).to.be.an.instanceof(ObjectValidator);

      expect(validator.keys({
        baz: (v) => v.string(),
        foo2: (v) => v.number().required()
      })).to.be.an.instanceof(ObjectValidator);
    });

    it('Calls key the number of keys in keyList times', () => {
      validator.key = spy();
      validator.keys({
        foo: (v) => v.number().integer().required(),
        bar: (v) => v.boolean().true().required()
      });

      expect(validator.key.calledTwice).to.be.true;
    });

    it('Passes the correct parameters to key', () => {
      validator.key = spy();
      let fooFn = (v) => v.number().integer().required();
      let barFn = (v) => v.boolean().true().required();
      validator.keys({
        foo: fooFn,
        bar: barFn
      });

      expect(validator.key.calledWithExactly('foo', fooFn)).to.be.true;
      expect(validator.key.calledWithExactly('bar', barFn)).to.be.true;
    });

    it('Is valid if keyList passes', () => {
      const user = {
        username: 'JohnDoe',
        password: 'secretpassword',
        age: 17
      };
      validator = new ObjectValidator(user);

      expect(validator.keys({
        username: (v) => v.string().min(3).max(10).match(/[a-zA-Z0-9]/).required(),
        password: (v) => v.string().min(8).required(),
        age: (v) => v.number().integer().required()
      }).valid()).to.be.true;
    });

    it('Is invalid if keyList does not pass', () => {
      const user = {
        username: 'JD',
        password: 'short',
        age: 17
      };
      validator = new ObjectValidator(user);

      expect(validator.keys({
        username: (v) => v.string().min(3).max(10).match(/[a-zA-Z0-9]/).required(),
        password: (v) => v.string().min(8).required(),
        age: (v) => v.number().integer().min(18).required()
      }).valid()).to.be.false;
    });

    it('Sets the correct errors', () => {
      const user = {
        username: 'J@',
        password: 'short',
        age: 17
      };
      validator = new ObjectValidator(user);

      validator.keys({
        username: (v) => v.string().min(3).max(10).match(/^[a-zA-Z0-9]$/).required(),
        password: (v) => v.string().min(8).required(),
        age: (v) => v.number().integer().min(18).required(),
        language: (v) => v.string().length(2).required()
      });

      expect(validator.errors()[0].type).to.equal('key');
      expect(validator.errors()[0].expected).to.equal('username');
      expect(validator.errors()[0].actual.length).to.equal(2);

      expect(validator.errors()[1].type).to.equal('key');
      expect(validator.errors()[1].expected).to.equal('password');
      expect(validator.errors()[1].actual.length).to.equal(1);

      expect(validator.errors()[2].type).to.equal('key');
      expect(validator.errors()[2].expected).to.equal('age');
      expect(validator.errors()[2].actual.length).to.equal(1);

      expect(validator.errors()[3].type).to.equal('key');
      expect(validator.errors()[3].expected).to.equal('language');
      expect(validator.errors()[3].actual).to.equal(undefined);
    });

  });

});
