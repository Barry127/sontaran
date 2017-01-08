const { expect }      = require('chai');
const RegExpValidator = require('./RegExp');

describe('Validator / types / RegExp', () => {

  it('Is valid if given value is a RegExp literal', () => {
    const value = /[a-z]/
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is valid if given value is a RegExp with constructor', () => {
    const value = new RegExp('[a-z]');
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Adds an error if given value is undefined', () => {
    const validator = new RegExpValidator();

    expect(validator.valid()).to.be.false;
  });

  it('Adds an error if given value is null', () => {
    const value = null;
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('RegExp');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Adds an error if given value is of type boolean', () => {
    const value = true;
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('RegExp');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Adds an error if given value is of type number', () => {
    const value = 42;
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('RegExp');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Adds an error if given value is of type object but not an instance of RegExp', () => {
    const value = {};
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('RegExp');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Adds an error if given value is of type string', () => {
    const value = 'Hello World!';
    const validator = new RegExpValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('RegExp');
    expect(validator.errors()[0].actual).to.equal('string');
  });

});
