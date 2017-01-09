const { expect }      = require('chai');
const { spy }         = require('sinon');
const StringValidator = require('./String');

const nonAscii = '♠♣♥♦';
const ascii = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`;
const extendedAscii = `${ascii} ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`;

describe('Validator / types / String', () => {

  it('Is valid if given value is of type string', () => {
    const value = 'Hello World';
    const validator = new StringValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new StringValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('undefined');
    });

  it('Is invalid if given value is null', () => {
    const value = null;
    const validator = new StringValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is boolean', () => {
    const value = true;
    const validator = new StringValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is boolean', () => {
    const value = 42;
    const validator = new StringValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Is invalid if given type is object', () => {
    const value = {};
    const validator = new StringValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  describe('ascii', () => {

    it('Returns itself', () => {
      const validator = new StringValidator(ascii);

      expect(validator.ascii()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value only contains ascii values', () => {
      const validator = new StringValidator(ascii);

      expect(validator.ascii().valid()).to.be.true;
    });

    it('Is invalid if the value contains extended ascii values', () => {
      const validator = new StringValidator(extendedAscii);

      expect(validator.ascii().valid()).to.be.false;
    });

    it('Is invalid if the value contains non-ascii values', () => {
      const validator = new StringValidator(ascii + nonAscii);

      expect(validator.ascii().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new StringValidator(extendedAscii).ascii();

      expect(validator.errors()[0].type).to.equal('ascii');
      expect(validator.errors()[0].expected).to.equal('/^[\\x00-\\x7F]*$/');
      expect(validator.errors()[0].actual).to.equal(extendedAscii);
    });

  });

  describe('base64', () => {

    it('Returns itself', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0PyE=';
      const validator = new StringValidator(value);

      expect(validator.base64()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is a valid base64 encoded string', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0PyE=';
      const validator = new StringValidator(value);

      expect(validator.base64().valid()).to.be.true;
    });

    it('Is valid if the value is a valid base64 encoded string ending with 2 = characters', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0Py==';
      const validator = new StringValidator(value);

      expect(validator.base64().valid()).to.be.true;
    });

    it('Is invalid if the value is not a valid base64 encoded string', () => {
      const value = 'U29tZXRoaW5#IH[tYXJ0PyE=';
      const validator = new StringValidator(value);

      expect(validator.base64().valid()).to.be.false;
    });

    it('Is invalid if the encoding is valid but length is not a multiple of 4', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0yE=';
      const validator = new StringValidator(value);

      expect(validator.base64().valid()).to.be.false;
    });

    it('Is invalid if the value contains any = characters that are not at the end of the string', () => {
      const value       = 'U29tZXRoaW=nIHNtYXJ0PyE=';
      const value2      = 'U29tZXRoaW5nIHNtYXJ0Py=E';
      const validator   = new StringValidator(value);
      const validator2  = new StringValidator(value2);

      expect(validator.base64().valid()).to.be.false;
      expect(validator2.base64().valid()).to.be.false;
    });

    it('Is invalid if the value ends with more than 2 = characters', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0P===';
      const validator = new StringValidator(value);

      expect(validator.base64().valid()).to.be.false;
    });

    it('Sets the right type, expected and actual to the error', () => {
      const value = 'U29tZXRoaW5#IH[tYXJ0PyE=';
      const validator = new StringValidator(value).base64();

      expect(validator.errors()[0].type).to.equal('base64');
      expect(validator.errors()[0].expected).to.equal('/^[A-Za-z0-9+\\/=]*$/');
      expect(validator.errors()[0].actual).to.equal('U29tZXRoaW5#IH[tYXJ0PyE=');
    });

  });

  describe('between', () => {

    it('Throws an Error if minLength is not of type number', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between.bind(validator, '5', 7)).to.throw(Error, 'StringValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if minLength is not an integer', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between.bind(validator, 5.14, 7)).to.throw(Error, 'StringValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not of type number', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between.bind(validator, 5, '7')).to.throw(Error, 'StringValidator.max: maxLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not an integer', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between.bind(validator, 5, 7.5)).to.throw(Error, 'StringValidator.max: maxLength is not a valid integer');
    });

    it('Returns itself', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(5, 7)).to.be.an.instanceof(StringValidator);
      expect(validator.between(7, 5)).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if length of the value is between minLength and maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(5, 7).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly minLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(6, 7).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(5, 6).valid()).to.be.true;
    });

    it('Is invalid if length of the value is less than minLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(7, 9).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual for the error in the above case', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value).between(7, 9);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(7);
      expect(validator.errors()[0].actual).to.equal(6);
    })

    it('Is invalid if length of the value is greater than maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.between(3, 5).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual for the error in the above case', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value).between(3, 5);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(5);
      expect(validator.errors()[0].actual).to.equal(6);
    });

  });

  describe('contains', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('The quick brown foX jump5 0v3r 7h3 l4zy d06');
    });

    it('Throws an Error if query is not of type string', () => {
      expect(validator.contains.bind(validator, 3)).to.throw(Error, 'StringValidator.contains: query is not of type string');
    });

    it('Throws an Error if caseSensitive is not of type boolean', () => {
      expect(validator.contains.bind(validator, 'brown foX', 'true')).to.throw(Error, 'StringValidator.contains: caseSensitive is not of type boolean');
    });

    it('Returns itself', () => {
      expect(validator.contains('foX')).to.be.an.instanceof(StringValidator);
      expect(validator.contains('cAt')).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value contains query and caseSensitive is true', () => {
      expect(validator.contains('brown foX', true).valid()).to.be.true;
    });

    it('Is valid if the value contains query and caseSensitive is false', () => {
      expect(validator.contains('brown foX', false).valid()).to.be.true;
    });

    it('Is valid if the value contains query (but in different casing) and caseSensitive is false', () => {
      expect(validator.contains('broWn fox', false).valid()).to.be.true;
    });

    it('Is invalid if the value contains query (but in different casing) and caseSensitive is true', () => {
      expect(validator.contains('broWn fox', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.contains('broWn fox', true);

      expect(validator.errors()[0].type).equal('contains');
      expect(validator.errors()[0].expected).equal('broWn fox');
      expect(validator.errors()[0].actual).equal('The quick brown foX jump5 0v3r 7h3 l4zy d06');
    });

    it('Is invalid if the query is not in the value and caseSensitive is true', () => {
      expect(validator.contains('red foX', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.contains('red foX', true);

      expect(validator.errors()[0].type).equal('contains');
      expect(validator.errors()[0].expected).equal('red foX');
      expect(validator.errors()[0].actual).equal('The quick brown foX jump5 0v3r 7h3 l4zy d06');
    });

    it('Is invalid if the query is not in the value and caseSensitive is false', () => {
      expect(validator.contains('red foX', false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.contains('red foX', false);

      expect(validator.errors()[0].type).equal('contains (case insensitive)');
      expect(validator.errors()[0].expected).equal('red foX');
      expect(validator.errors()[0].actual).equal('The quick brown foX jump5 0v3r 7h3 l4zy d06');
    });

  });

  describe('empty', () => {

    it('Returns itself', () => {
      const validator = new StringValidator('');
      const validator2 = new StringValidator('notEmpty');

      expect(validator.empty()).to.be.an.instanceof(StringValidator);
      expect(validator2.empty()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is empty', () => {
      const value = '';
      const validator = new StringValidator(value);

      expect(validator.empty().valid()).to.be.true;
    });

    it('Is valid if the value only contains whitespaces', () => {
      const value = '  ';
      const validator = new StringValidator(value);

      expect(validator.empty().valid()).to.be.true;
    });

    it('Is invalid if the value is not empty', () => {
      const value = 'not Empty';
      const validator = new StringValidator(value);

      expect(validator.empty().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'notEmpty';
      const validator = new StringValidator(value).empty();

      expect(validator.errors()[0].type).to.equal('empty');
      expect(validator.errors()[0].expected).to.equal('');
      expect(validator.errors()[0].actual).to.equal('notEmpty');
    });

  });

  describe('endsWith', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('The richest man is not he who has the most, but he who needs the least.');
    });

    it('Throws an Error if query is not of type string', () => {
      expect(validator.endsWith.bind(validator, true)).to.throw(Error, 'StringValidator.endsWith: query is not of type string');
    });

    it('Throws an Error if caseSensitive is not of type boolean', () => {
      expect(validator.endsWith.bind(validator, 'needs the least.', 'false')).to.throw(Error, 'StringValidator.endsWith: caseSensitive is not of type boolean');
    });

    it('Returns itself', () => {
      expect(validator.endsWith('needs the least.')).to.be.an.instanceof(StringValidator);
      expect(validator.endsWith('needs the most.')).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value ends with query and caseSensitive is true', () => {
      expect(validator.endsWith('needs the least.', true).valid()).to.be.true;
    });

    it('Is valid if the value ends with query and caseSensitive is false', () => {
      expect(validator.endsWith('needs the least.', false).valid()).to.be.true;
    });

    it('Is valid if the value ends with query (but casing is different) and caseSensitive is false', () => {
      expect(validator.endsWith('Needs The Least.', false).valid()).to.be.true;
    });

    it('Is invalid if the value ends with query (but casing is different) and caseSensitive is true', () => {
      expect(validator.endsWith('Needs The Least.', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.endsWith('Needs The Least.', true);

      expect(validator.errors()[0].type).to.equal('endsWith');
      expect(validator.errors()[0].expected).to.equal('Needs The Least.');
      expect(validator.errors()[0].actual).to.equal(' needs the least.');
    });

    it('Is invalid if the value does not end with query and caseSensitive is true', () => {
      expect(validator.endsWith('needs the most.', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.endsWith('needs the most.', true);

      expect(validator.errors()[0].type).to.equal('endsWith');
      expect(validator.errors()[0].expected).to.equal('needs the most.');
      expect(validator.errors()[0].actual).to.equal('needs the least.');
    });

    it('Is invalid if the value does not end with query and caseSensitive is false', () => {
      expect(validator.endsWith('needs the most.', false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.endsWith('needs the most.', false);

      expect(validator.errors()[0].type).to.equal('endsWith (case insensitive)');
      expect(validator.errors()[0].expected).to.equal('needs the most.');
      expect(validator.errors()[0].actual).to.equal('needs the least.');
    });

  });

  describe('enum', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('baz');
      validator.oneOf = spy();
    })

    it('Calls oneOf', () => {
      validator.enum([]);

      expect(validator.oneOf.calledOnce).to.be.true;
    });

    it('Passes list to oneOf', () => {
      const list = [ 'foo', 'bar', 'baz' ];
      validator.enum(list);

      expect(validator.oneOf.calledWithExactly(list)).to.be.true;
    });

  });

  describe('equals', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('SlipKnoT');
    });

    it('Throws an Error if query is not of type string', () => {
      expect(validator.equals.bind(validator, 4)).to.throw(Error, 'StringValidator.equals: query is not of type string');
    });

    it('Throws an Error if caseSensitive is not of type string', () => {
      expect(validator.equals.bind(validator, 'SlipKnoT', 'false')).to.throw(Error, 'StringValidator.equals: caseSensitive is not of type boolean');
    });

    it('Returns itself', () => {
      expect(validator.equals('SlipKnoT')).to.be.an.instanceof(StringValidator);
      expect(validator.equals('KoRn')).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value equals query and caseSensitive is true', () => {
      expect(validator.equals('SlipKnoT', true).valid()).to.be.true;
    });

    it('Is valid if the value equals query and caseSensitive is false', () => {
      expect(validator.equals('SlipKnoT', false).valid()).to.be.true;
    });

    it('Is valid if the value equals query (but casing is different) and caseSensitive is false', () => {
      expect(validator.equals('slipknot', false).valid()).to.be.true;
    });

    it('Is invalid if the value equals query (but casing is different) and caseSensitive is true', () => {
      expect(validator.equals('slipknot', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual on the error for the above case', () => {
      validator.equals('slipknot', true);

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal('slipknot');
      expect(validator.errors()[0].actual).to.equal('SlipKnoT');
    });

    it('Is invalid if the value does not equal query and caseSensitive is true', () => {
      expect(validator.equals('KoRn', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual on the error for the above case', () => {
      validator.equals('KoRn', true);

      expect(validator.errors()[0].type).to.equal('equals');
      expect(validator.errors()[0].expected).to.equal('KoRn');
      expect(validator.errors()[0].actual).to.equal('SlipKnoT');
    });

    it('Is invalid if the value does not equal query and caseSensitive is false', () => {
      expect(validator.equals('KoRn', false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual on the error for the above case', () => {
      validator.equals('KoRn', false);

      expect(validator.errors()[0].type).to.equal('equals (case insensitive)');
      expect(validator.errors()[0].expected).to.equal('KoRn');
      expect(validator.errors()[0].actual).to.equal('SlipKnoT');
    });

  });

  describe('extendedAscii', () => {

    it('Returns itself', () => {
      const validator = new StringValidator(ascii);

      expect(validator.extendedAscii()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value only contains ascii values', () => {
      const validator = new StringValidator(ascii);

      expect(validator.extendedAscii().valid()).to.be.true;
    });

    it('Is valid if the value only contains extended ascii values', () => {
      const validator = new StringValidator(extendedAscii);

      expect(validator.extendedAscii().valid()).to.be.true;
    });

    it('Is invalid if the value contains non-ascii values', () => {
      const validator = new StringValidator(extendedAscii + nonAscii);

      expect(validator.extendedAscii().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new StringValidator(nonAscii).extendedAscii();

      expect(validator.errors()[0].type).to.equal('extendedAscii');
      expect(validator.errors()[0].expected).to.equal('/^[\\x00-\\xFF]*$/');
      expect(validator.errors()[0].actual).to.equal(nonAscii);
    });

  });

  describe('hexColor', () => {

    it('Returns itself', () => {
      const validator = new StringValidator('#CC0000');

      expect(validator.hexColor()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is a valid hex color', () => {
      const value = '#CC0000';
      const validator = new StringValidator(value);

      expect(validator.hexColor().valid()).to.be.true;
    });

    it('Is valid if the value is a valid hex color containing lower and uppercase letters', () => {
      const value = '#cC0000';
      const validator = new StringValidator(value);

      expect(validator.hexColor().valid()).to.be.true;
    });

    it('Is valid if the value contains a shorthand hex color', () => {
      const value = '#C00';
      const validator = new StringValidator(value);

      expect(validator.hexColor().valid()).to.be.true;
    });

    it('Is invalid if the hashtag is omitted', () => {
      const value = 'CC0000';
      const validator = new StringValidator(value);

      expect(validator.hexColor().valid()).to.be.false;
    });

    it('Is invalid if the value is not a valid hex color', () => {
      const value = 'fg0000';
      const validator = new StringValidator(value);

      expect(validator.hexColor().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'fg0000';
      const validator = new StringValidator(value).hexColor();

      expect(validator.errors()[0].type).to.equal('hexColor');
      expect(validator.errors()[0].expected).to.equal('/^#([0-9A-F]{3}|[0-9A-F]{6})$/i');
      expect(validator.errors()[0].actual).to.equal('fg0000');

    });

  });

  describe('JSON', () => {

    it('Returns itself', () => {
      const value = '{"title":"My Title", "slug": "my-title"}';
      const validator = new StringValidator(value);

      expect(validator.JSON()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is valid JSON', () => {
      const value = '{"title":"My Title", "slug": "my-title"}';
      const validator = new StringValidator(value);

      expect(validator.JSON().valid()).to.be.true;
    });

    it('Is invalid if the value is not valid JSON', () => {
      const value = '{"title":"wrong", }';
      const validator = new StringValidator(value);

      expect(validator.JSON().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = '{"title":"wrong", }';
      const validator = new StringValidator(value).JSON();

      expect(validator.errors()[0].type).to.equal('JSON');
      expect(validator.errors()[0].expected).to.equal('valid JSON');
      expect(validator.errors()[0].actual).to.equal('{"title":"wrong", }');
    });

  });

  describe('json', () => {

    it('Calls JSON', () => {
      const value = '{"title":"My Title", "slug": "my-title"}';
      const validator = new StringValidator(value);
      validator.JSON = spy();
      validator.json();

      expect(validator.JSON.calledOnce).to.be.true;
    });

  });

  describe('length', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('FooBar');
    });

    it('Throws an Error if length is not of type number', () => {
      expect(validator.length.bind(validator, '6')).to.throw(Error, 'StringValidator.length: length is not a valid integer');
    });

    it('Throws an Error if length is not an integer', () => {
      expect(validator.length.bind(validator, 6.66)).to.throw(Error, 'StringValidator.length: length is not a valid integer');
    });

    it('Returns itself', () => {
      expect(validator.length(6)).to.be.an.instanceof(StringValidator);
      expect(validator.length(8)).to.be.an.instanceof(StringValidator);
    });

    it('Is Valid if the length of the value is exactly length', () => {
      expect(validator.length(6).valid()).to.be.true;
    });

    it('Is invalid if the length of the value is less than length', () => {
      expect(validator.length(7).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.length(7);

      expect(validator.errors()[0].type).to.equal('length');
      expect(validator.errors()[0].expected).to.equal(7);
      expect(validator.errors()[0].actual).to.equal(6);
    });

    it('Is invalid if the length of the value is greater than length', () => {
      expect(validator.length(5).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.length(5);

      expect(validator.errors()[0].type).to.equal('length');
      expect(validator.errors()[0].expected).to.equal(5);
      expect(validator.errors()[0].actual).to.equal(6);
    });

  });

  describe('lowerCase', () => {

    it('Calls lowercase', () => {
      const value = 'lowercase';
      const validator = new StringValidator(value);
      validator.lowercase = spy();
      validator.lowerCase();

      expect(validator.lowercase.calledOnce).to.be.true;
    });

  });

  describe('lowercase', () => {

    it('Returns itself', () => {
      const validator = new StringValidator('lowercase');
      const validator2 = new StringValidator('UpPeRcAsE');

      expect(validator.lowerCase()).to.be.an.instanceof(StringValidator);
      expect(validator2.lowerCase()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is lowercase', () => {
      const value = 'lowercase';
      const validator = new StringValidator(value);

      expect(validator.lowercase().valid()).to.be.true;
    });

    it('Is valid if the value is lowercase mixed with numbers and characters', () => {
      const value = 'l0w3rc@se';
      const validator = new StringValidator(value);

      expect(validator.lowercase().valid()).to.be.true;
    });

    it('Is valid if the value contains no letters', () => {
      const value = '4\\/\\/50/\\/\\3';
      const validator = new StringValidator(value);

      expect(validator.lowercase().valid()).to.be.true;
    });

    it('Is invalid if the value contains uppercase letters', () => {
      const value = 'B@dAsS?!';
      const validator = new StringValidator(value);

      expect(validator.lowercase().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'B@dAsS?!';
      const validator = new StringValidator(value).lowercase();

      expect(validator.errors()[0].type).to.equal('lowercase');
      expect(validator.errors()[0].expected).to.equal('b@dass?!');
      expect(validator.errors()[0].actual).to.equal('B@dAsS?!');
    });

  });

  describe('match', () => {

    it('Throws an Error if pattern is not of type RegExp', () => {
      const value = 'abc';
      const validator = new StringValidator(value);

      expect(validator.match.bind(validator, 'abc')).to.throw(Error, 'StringValidator.match: pattern is not an instance of RegExp');
    });

    it('Returns itself', () => {
      const value = 'abc';
      const validator = new StringValidator(value);

      expect(validator.match(/[a-z]/)).to.be.an.instanceof(StringValidator);
      expect(validator.match(/[A-Z]/)).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value matches pattern', () => {
      const value = 'abc';
      const validator = new StringValidator(value);

      expect(validator.match(/[a-z]/).valid()).to.be.true;
    });

    it('Is invalid if the value does not match pattern', () => {
      const value = 'abc';
      const validator = new StringValidator(value);

      expect(validator.match(/[A-Z]/).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual on the error', () => {
      const value = 'abc';
      const validator = new StringValidator(value).match(/[A-Z]/);

      expect(validator.errors()[0].type).to.equal('match');
      expect(validator.errors()[0].expected).to.equal('/[A-Z]/');
      expect(validator.errors()[0].actual).to.equal('abc');
    });

    it('Extends the default error if _error is given', () => {
      const value = 'abc';
      const validator = new StringValidator(value).match(/[A-Z]/, {
        type: 'customType',
        message: 'customMessage'
      });

      expect(validator.errors()[0].type).to.equal('customType');
      expect(validator.errors()[0].expected).to.equal('/[A-Z]/');
      expect(validator.errors()[0].actual).to.equal('abc');
      expect(validator.errors()[0].message).to.equal('customMessage');
    });

  });

  describe('max', () => {

    it('Throws an Error if maxLength is not of type number', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.max.bind(validator, '7')).to.throw(Error, 'StringValidator.max: maxLength is not a valid integer');
    });

    it('Throws an Error if maxLength is not an integer', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.max.bind(validator, 7.14)).to.throw(Error, 'StringValidator.max: maxLength is not a valid integer');
    });

    it('Is valid if length of the value is less than maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.max(7).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.max(6).valid()).to.be.true;
    });

    it('Is invalid if length of the value is greater than maxLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.max(5).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value).max(5);

      expect(validator.errors()[0].type).to.equal('max');
      expect(validator.errors()[0].expected).to.equal(5);
      expect(validator.errors()[0].actual).to.equal(6);
    });

  });

  describe('min', () => {

    it('Throws an Error if minLength is not of type number', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.min.bind(validator, '5')).to.throw(Error, 'StringValidator.min: minLength is not a valid integer');
    });

    it('Throws an Error if minLength is not an integer', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.min.bind(validator, 3.14)).to.throw(Error, 'StringValidator.min: minLength is not a valid integer');
    });

    it('Is valid if length of the value is greater than minLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.min(5).valid()).to.be.true;
    });

    it('Is valid if length of the value is exactly minLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.min(6).valid()).to.be.true;
    });

    it('Is invalid if length of the value is less than minLength', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value);

      expect(validator.min(7).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'FooBar';
      const validator = new StringValidator(value).min(7);

      expect(validator.errors()[0].type).to.equal('min');
      expect(validator.errors()[0].expected).to.equal(7);
      expect(validator.errors()[0].actual).to.equal(6);
    });

  });

  describe('notEmpty', () => {

    it('Returns itself', () => {
      const validator = new StringValidator('');
      const validator2 = new StringValidator('notEmpty');

      expect(validator.notEmpty()).to.be.an.instanceof(StringValidator);
      expect(validator2.notEmpty()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is not empty', () => {
      const value = 'not Empty';
      const validator = new StringValidator(value);

      expect(validator.notEmpty().valid()).to.be.true;
    });

    it('Is invalid if the value is empty', () => {
      const value = '';
      const validator = new StringValidator(value);

      expect(validator.notEmpty().valid()).to.be.false;
    });

    it('Is invalid if the value only contains whitespaces', () => {
      const value = '  ';
      const validator = new StringValidator(value);

      expect(validator.notEmpty().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = '';
      const validator = new StringValidator(value).notEmpty();

      expect(validator.errors()[0].type).to.equal('notEmpty');
      expect(validator.errors()[0].expected).to.equal('/^[\\s]*$/');
      expect(validator.errors()[0].actual).to.equal('');
    });

  });

  describe('oneOf', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('baz');
    });

    it('Throws an Error if list is no Array', () => {
      expect(validator.oneOf.bind(validator, {})).to.throw(Error, 'StringValidator.oneOf: list is not an Array');
    });

    it('Throws an Error if list is not an Array of string values', () => {
      expect(validator.oneOf.bind(validator, ['foo', 'bar', true])).to.throw(Error, `StringValidator.oneOf: list item 2 with value true is not of type string`);
    });

    it('Returns itself', () => {
      expect(validator.oneOf(['foo', 'bar', 'baz'])).to.be.an.instanceof(StringValidator);
      expect(validator.oneOf(['foo', 'bar'])).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is in list', () => {
      expect(validator.oneOf(['foo', 'bar', 'baz']).valid()).to.be.true;
    });

    it('Is invalid if the value is not in list', () => {
      expect(validator.oneOf(['foo', 'bar']).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.oneOf(['foo', 'bar']);

      expect(validator.errors()[0].type).to.equal('oneOf');
      expect(validator.errors()[0].expected).to.equal('[foo,bar]');
      expect(validator.errors()[0].actual).to.equal('baz');
    });

  });

  describe('regExp', () => {

    it('Calls match', () => {
      const value = 'xyz';
      const validator = new StringValidator(value);
      validator.match = spy();
      validator.regExp(/[a-z]/);

      expect(validator.match.calledOnce).to.be.true;
    });

    it('Passes pattern to match', () => {
      const value = 'xyz';
      const validator = new StringValidator(value);
      const pattern = /[a-z]/;
      validator.match = spy();
      validator.regExp(pattern);

      expect(validator.match.calledWithExactly(pattern)).to.be.true;
    });

  });

  describe('startsWith', () => {

    let validator;

    beforeEach(() => {
      validator = new StringValidator('Those who believe in telekinetics, raise my hand.');
    });

    it('Throws an Error if query is not of type string', () => {
      expect(validator.startsWith.bind(validator, {})).to.throw(Error, 'StringValidator.startsWith: query is not of type string');
    });

    it('Throws an Error if caseSensitive is not of type boolean', () => {
      expect(validator.startsWith.bind(validator, 'Those', 'true')).to.throw(Error, 'StringValidator.startsWith: caseSensitive is not of type boolean');
    });

    it('Returns itself', () => {
      expect(validator.startsWith('Those')).to.be.an.instanceof(StringValidator);
      expect(validator.startsWith('These')).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value starts with query and caseSensitive is false', () => {
      expect(validator.startsWith('Those who', true).valid()).to.be.true;
    });

    it('Is valid if the value starts with query and caseSensitive is true', () => {
      expect(validator.startsWith('Those who', false).valid()).to.be.true;
    });

    it('Is valid if the value starts with query (but casing is different) and caseSensitive is false', () => {
      expect(validator.startsWith('thoSe Who', false).valid()).to.be.true;
    });

    it('Is invalid if the value starts with query (but casing is different) and caseSensitive is true', () => {
      expect(validator.startsWith('thoSe Who', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.startsWith('thoSe Who', true);

      expect(validator.errors()[0].type).to.equal('startsWith');
      expect(validator.errors()[0].expected).to.equal('thoSe Who');
      expect(validator.errors()[0].actual).to.equal('Those who');
    });

    it('Is invalid if the value does not start with query and caseSensitive is true', () => {
      expect(validator.startsWith('These', true).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.startsWith('These', true);

      expect(validator.errors()[0].type).to.equal('startsWith');
      expect(validator.errors()[0].expected).to.equal('These');
      expect(validator.errors()[0].actual).to.equal('Those');
    });

    it('Is invalid if the value does not start with query and caseSensitive is false', () => {
      expect(validator.startsWith('These', false).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error for the above case', () => {
      validator.startsWith('These', false);

      expect(validator.errors()[0].type).to.equal('startsWith (case sensitive)');
      expect(validator.errors()[0].expected).to.equal('These');
      expect(validator.errors()[0].actual).to.equal('Those');
    });

  });

  describe('upperCase', () => {

    it('Calls uppercase', () => {
      const validator = new StringValidator('UPPERCASE');
      validator.uppercase = spy();
      validator.upperCase();

      expect(validator.uppercase.calledOnce).to.be.true;
    });

  });

  describe('uppercase', () => {

    it('Returns itself', () => {
      const validator = new StringValidator('UPPERCASE');
      const validator2 = new StringValidator('lowercase');

      expect(validator.uppercase()).to.be.an.instanceof(StringValidator);
      expect(validator2.uppercase()).to.be.an.instanceof(StringValidator);
    });

    it('Is valid if the value is uppercase', () => {
      const value = 'UPPERCASE';
      const validator = new StringValidator(value);

      expect(validator.uppercase().valid()).to.be.true;
    });

    it('Is valid if the value is uppercase mixed with numbers and characters', () => {
      const value = 'UPP3RC@S3';
      const validator = new StringValidator(value);

      expect(validator.uppercase().valid()).to.be.true;
    });

    it('Is valid if the value contains no letters', () => {
      const value = '|-|3`/';
      const validator = new StringValidator(value);

      expect(validator.uppercase().valid()).to.be.true;
    });

    it('Is invalid if the value contains uppercase letters', () => {
      const value = 'UpPeRcAsE';
      const validator = new StringValidator(value);

      expect(validator.uppercase().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const value = 'UpPeRcAsE';
      const validator = new StringValidator(value).uppercase();

      expect(validator.errors()[0].type).to.equal('uppercase');
      expect(validator.errors()[0].expected).to.equal('UPPERCASE');
      expect(validator.errors()[0].actual).to.equal('UpPeRcAsE');
    });

  });

});
