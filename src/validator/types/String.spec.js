const { expect }      = require('chai');
const StringValidator = require('./String');

const nonAscii = '♠♣♥♦';
const ascii = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`;
const extendedAscii = `${ascii} ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`;

describe('Validator / types / String', () => {

  it('Returns itself is given value type is string', () => {
    const value = 'Hello World!';
    const validator = new StringValidator(value);

    expect(validator).to.be.an.instanceof(StringValidator);
  });

  it('Throws a TypeError if given value is undefined', () => {
    const createValidator = () => {
      return new StringValidator();
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const createValidator = () => {
      return new StringValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is boolean', () => {
    const value = true;
    const createValidator = () => {
      return new StringValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is number', () => {
    const value = 127;
    const createValidator = () => {
      return new StringValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given type is object', () => {
    const value = {};
    const createValidator = () => {
      return new StringValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  describe('ascii', () => {

    it('Returns itself if the value only contains ascii values', () => {
      const validator = new StringValidator(ascii);

      expect(validator.ascii()).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if the value contains extended ascii values', () => {
      const validator = new StringValidator(extendedAscii);

      expect(validator.ascii.bind(validator)).to.throw(Error);
    });

    it('Throws an Error if the value contains non-ascii values', () => {
      const validator = new StringValidator(nonAscii);

      expect(validator.ascii.bind(validator)).to.throw(Error);
    });

  });

  describe('base64', () => {

    it('Returns itself if the value is a valid base64 encoded string', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0PyE=';
      const validator = new StringValidator(value);

      expect(validator.base64()).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if the encoding is invalid', () => {
      const value = 'U29tZXRoaW5#IH[tYXJ0PyE=';
      const validator = new StringValidator(value);

      expect(validator.base64.bind(validator)).to.throw(Error);
    });

    it('Throws an Error if encoding is valid but length is not a multiple of 4', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0yE=';
      const validator = new StringValidator(value);

      expect(validator.base64.bind(validator)).to.throw(Error);
    });

    it('Throws an Error if the value contains any = characters that are not at the end of the string', () => {
      const value       = 'U29tZXRoaW=nIHNtYXJ0PyE=';
      const value2      = 'U29tZXRoaW5nIHNtYXJ0Py=E';
      const validator   = new StringValidator(value);
      const validator2  = new StringValidator(value2);

      expect(validator.base64.bind(validator)).to.throw(Error);
      expect(validator2.base64.bind(validator2)).to.throw(Error);
    });

    it('Throws an Error if the string ends with more than 2 = characters', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0P===';
      const validator = new StringValidator(value);

      expect(validator.base64.bind(validator)).to.throw(Error);
    });

    it('Returns itself if the value is a valid base64 encoded string ending with 2 = characters', () => {
      const value = 'U29tZXRoaW5nIHNtYXJ0Py==';
      const validator = new StringValidator(value);

      expect(validator.base64()).to.be.an.instanceof(StringValidator);
    });

  });

  describe('between', () => {

    const validator = new StringValidator('FooBar');

    it('Throws a TypeError if minLength is not of type number', () => {
      expect(validator.between.bind(validator, '2', 7)).to.throw(TypeError);
    });

    it('Throws an Error if minLength is no integer', () => {
      expect(validator.between.bind(validator, 2.5, 7)).to.throw(Error);
    });

    it('Throws a TypeError if maxnLength is not of type number', () => {
      expect(validator.between.bind(validator, 2, '7')).to.throw(TypeError);
    });

    it('Throws an Error if maxLength is no integer', () => {
      expect(validator.between.bind(validator, 2, 7.3)).to.throw(Error);
    });

    it('Throws an Error if minLength is greater than maxLength', () => {
      expect(validator.between.bind(validator, 7, 2)).to.throw(Error);
    });

    it('Returns itself if length of value is between minLength and maxLength', () => {
      expect(validator.between(2, 7)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if length of value is exactly minLength', () => {
      expect(validator.between(6, 7)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if length of value is exactly maxLength', () => {
      expect(validator.between(2, 6)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if length of value is less than minLength', () => {
      expect(validator.between.bind(validator, 7, 9)).to.throw(Error);
    });

    it('Throws an Error if length of value is greater than maxLength', () => {
      expect(validator.between.bind(validator, 2, 5)).to.throw(Error);
    });

  });

  describe('contains', () => {

    const validator = new StringValidator('The quick brown foX jump5 0v3r 7h3 l4zy d06');

    it('Throws a TypeError if query is not of type string', () => {
      expect(validator.contains.bind(validator, 3)).to.throw(TypeError);
    });

    it('Throws a TypeError if caseSensitive is not of type boolean', () => {
      expect(validator.contains.bind(validator, 'brown foX', 'true')).to.throw(TypeError);
    });

    it('Returns itself if query is in the value and caseSensitive is true', () => {
      expect(validator.contains('brown foX', true)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if query is in the value and caseSensitive is false', () => {
      expect(validator.contains('brown foX', false)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if query is in the value (but casing is different) and caseSensitive is false', () => {
      expect(validator.contains('broWn fox', false)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if query is in the value (but casing is different) and caseSensitive is true', () => {
      expect(validator.contains.bind(validator, 'broWn fox', true)).to.throw(Error);
    });

    it('Throws an Error if query is not in the value and caseSensitive is true', () => {
      expect(validator.contains.bind(validator, 'red foX', true)).to.throw(Error);
    });

    it('Throws an Error if query is not in the value and caseSensitive is false', () => {
      expect(validator.contains.bind(validator, 'red foX', false)).to.throw(Error);
    });

  });

  describe('endsWith', () => {

    const validator = new StringValidator('The richest man is not he who has the most, but he who needs the least.');

    it('Throws a TypeError if query is not of type string', () => {
      expect(validator.endsWith.bind(validator, true)).to.throw(TypeError);
    });

    it('Throws a TypeError if caseSensitive is not of type boolean', () => {
      expect(validator.endsWith.bind(validator, 'needs the least.', 'false')).to.throw(TypeError);
    });

    it('Returns itself the value ends with query and caseSensitive is true', () => {
      expect(validator.endsWith('needs the least.', true)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself the value ends with query and caseSensitive is false', () => {
      expect(validator.endsWith('needs the least.', false)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if the value ends with query (but casing is different) and caseSensitive is false', () => {
      expect(validator.endsWith('Needs The Least.', false)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if the value ends with query (but casing is different) and caseSensitive is true', () => {
      expect(validator.endsWith.bind(validator, 'Needs The Least.', true)).to.throw(Error);
    });

    it('Throws an Error if the value does not end with query and caseSensitive is true', () => {
      expect(validator.endsWith.bind(validator, 'needs the most.', true)).to.throw(Error);
    });

    it('Throws an Error if the value does not end with query and caseSensitive is false', () => {
      expect(validator.endsWith.bind(validator, 'needs the most.', false)).to.throw(Error);
    });

  });

  describe('equals', () => {

    const validator = new StringValidator('SlipKnoT');

    it('Throws a TypeError if checkValue is not of type string', () => {
      expect(validator.equals.bind(validator, 4)).to.throw(TypeError);
    });

    it('Throws a TypeError if caseSensitive is not of type boolean', () => {
      expect(validator.equals.bind(validator, 'SlipKnoT', 'false')).to.throw(TypeError);
    });

    it('Returns itself if checkValue equals the value and caseSensitive is true', () => {
      expect(validator.equals('SlipKnoT', true)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if checkValue equals the value and caseSensitive is false', () => {
      expect(validator.equals('SlipKnoT', false)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if checkValue equals the value (but casing is different) and caseSensitive is false', () => {
      expect(validator.equals('slipknot', false)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if checkValue equals the value (but casing is different) and caseSensitive is true', () => {
      expect(validator.equals.bind(validator, 'slipknot', true)).to.throw(Error);
    });

    it('Throws an Error if checkValue does not match the value and caseSensitive is true', () => {
      expect(validator.equals.bind(validator, 'KoRn', true)).to.throw(Error);
    });

    it('Throws an Error if checkValue does not match the value and caseSensitive is false', () => {
      expect(validator.equals.bind(validator, 'KoRn', false)).to.throw(Error);
    });

  });

  describe('extendedAscii', () => {

    it('Returns itself if the value only contains ascii values', () => {
      const validator = new StringValidator(ascii);

      expect(validator.extendedAscii()).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if the value only contains extended ascii values', () => {
      const validator = new StringValidator(extendedAscii);

      expect(validator.extendedAscii()).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if the value contains non-ascii values', () => {
      const validator = new StringValidator(`${nonAscii}${ascii}`);

      expect(validator.extendedAscii.bind(validator)).to.throw(Error);
    });

  });

  describe('max', () => {

    const validator = new StringValidator('FooBar');

    it('Throws a TypeError if maxLength is not of type number', () => {
      expect(validator.max.bind(validator, '7')).to.throw(TypeError);
    });

    it('Throws an Error if maxLength is no integer', () => {
      expect(validator.max.bind(validator, 7.5)).to.throw(Error);
    });

    it('Returns itself if length of the value is less than maxLength', () => {
      expect(validator.max(7)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if length of the value is exactly maxLength', () => {
      expect(validator.max(6)).to.be.instanceof(StringValidator);
    });

    it('Throws an Error if length of the value is greater than maxLength', () => {
      expect(validator.max.bind(validator, 5)).to.throw(Error);
    });

  });

  describe('min', () => {
    const validator = new StringValidator('FooBar');

    it('Throws a TypeError if minLength is not of type number', () => {
      expect(validator.min.bind(validator, '5')).to.throw(TypeError);
    });

    it('Throws an Error if minLength is no integer', () => {
      expect(validator.min.bind(validator, 5.14)).to.throw(Error);
    });

    it('Returns itself if length of the value is greater than minLength', () => {
      expect(validator.min(5)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if length of the value is exactly minLength', () => {
      expect(validator.min(6)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if length of the value is less than minLength', () => {
      expect(validator.min.bind(validator, 7)).to.throw(Error);
    });

  });

  describe('startsWith', () => {

    const validator = new StringValidator('Those who believe in telekinetics, raise my hand.');

    it('Throws a TypeError if query is not of type string', () => {
      expect(validator.startsWith.bind(validator, {}, true)).to.throw(TypeError);
    });

    it('Throws a TypeError if caseSensitive is not of type boolean', () => {
        expect(validator.startsWith.bind(validator, 'Those who', 1)).to.throw(TypeError);
    });

    it('Returns itself if the value starts with query and caseSensitive is true', () => {
      expect(validator.startsWith('Those who', true)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if the value starts with query and caseSensitive is false', () => {
      expect(validator.startsWith('Those who', false)).to.be.an.instanceof(StringValidator);
    });

    it('Returns itself if the value starts with query (but casing is different) and caseSensitive is false', () => {
      expect(validator.startsWith('thoSe Who', false)).to.be.an.instanceof(StringValidator);
    });

    it('Throws an Error if the value starts with query (but casing is different) and caseSensitive is true', () => {
      expect(validator.startsWith.bind(validator, 'thoSe Who', true)).to.throw(Error);
    });

    it('Throws an Error if the value does not end with query and caseSensitive is true', () => {
      expect(validator.startsWith.bind(validator, 'These', true)).to.throw(Error);
    });

    it('Throws an Error if the value does not end with query and caseSensitive is false', () => {
      expect(validator.startsWith.bind(validator, 'These', false)).to.throw(Error);
    });

  });

});
