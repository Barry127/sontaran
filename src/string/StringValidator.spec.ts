import { StringValidator, string } from './StringValidator';

describe('StringValidator', () => {
  it('exports factory method', () => {
    expect(string()).toBeInstanceOf(StringValidator);
  });

  describe('string validation', () => {
    const validValues = ['aaa', 'Hello World!', 'Something'];
    const invalidValues = [true, null, undefined, 5, 0xff];
    const validator = string();

    validValues.forEach((value) => {
      it(`${value} is a valid string value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid string value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate(true);
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.string');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('string');
    });
  });

  describe('ascii', () => {
    let asciiRange = '';
    for (let i = 0; i < 128; i++) {
      asciiRange += String.fromCharCode(i);
    }
    const validValues = ['Hello World!', 'FooBar~!', 'Something', asciiRange];
    const invalidValues = ['♠♣♥♦', 'wrøng', '😍'];
    const validator = string().ascii();

    validValues.forEach((value) => {
      it(`${value} is a valid ascii string value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid ascii string value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('😍');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.ascii');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('ascii');
    });
  });

  describe('base64', () => {
    const validValues = [
      'U29tZXRoaW5nIHNtYXJ0PyE=',
      'U29tZXRoaW5nIHNtYXJ0Py=='
    ];
    const invalidValues = [
      'U29tZXRoaW5#IH[tYXJ0PyE=', // invalid character
      'U29tZXRoaW5nIHNtYXJ0yE=', // invalid length
      'U29tZXRoaW=nIHNtYXJ0PyE=', // = sign in the middle of string
      'U29tZXRoaW5nIHNtYXJ0Py=E', // = is not at the end
      'U29tZXRoaW5nIHNtYXJ0P===' // to many = signs at the end
    ];
    const validator = string().base64();

    validValues.forEach((value) => {
      it(`${value} is a valid base64 value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid base64 value`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('😍');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.base64');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('base64');
    });
  });

  describe('between', () => {
    const validPairs = [
      ['Hello', 4, 6],
      ['Hi', 1, 3],
      ['Hello World!', 0, Number.POSITIVE_INFINITY],
      ['Foo', 3, 4],
      [
        'This is always true',
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      ],
      ['Hello', 6, 4], // mixed up min and max
      ['Hi', 3, 1] // mixed up min and max
    ];
    const invaldPairs = [
      ['Hello', 1, 3],
      ['Hi', 3, 5],
      ['Awesome', 0, Number.NaN]
    ];

    validPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is between ${argument1} and ${argument2}`, () => {
        const result = string()
          .between(argument1 as number, argument2 as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invaldPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is not between ${argument1} and ${argument2}`, () => {
        const result = string()
          .between(argument1 as number, argument2 as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('between throws a TypeError when min is not a number', () => {
      const validator = string();
      expect(validator.between.bind(validator, '4' as any, 3)).toThrow(
        TypeError
      );
    });

    it('between throws a TypeError when max is not a number', () => {
      const validator = string();
      expect(validator.between.bind(validator, 4, '6' as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').between(2, 4).validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.max');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('4');
    });
  });

  describe('contains', () => {
    const validPairs = [
      ['Hello World', 'Hello'],
      ['Hello World', 'World'],
      ['Hello World', 'o W']
    ];
    const invalidPairs = [
      ['Hello World', 'hello'],
      ['Hello World', 'World '],
      ['Hello World', 'Earth'],
      ['Coca Cola', 'Pepsi']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} contains ${argument}`, () => {
        const result = string().contains(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not contains ${argument}`, () => {
        const result = string().contains(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').contains('hello').validate('b');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.contains');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('hello');
    });
  });

  describe('empty', () => {
    const validValues = ['', '  ', '\t', '\n', '\r', '\n  \n\t'];
    const invalidValues = ['_', 'Hello', 'FooBar', '.'];
    const validator = string().empty();

    validValues.forEach((value) => {
      it(`${value} is empty`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not empty`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('😍');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.empty');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('empty');
    });
  });

  describe('endsWidth', () => {
    const validPairs = [
      ['Hello World', 'World'],
      ['Hello World', 'ld'],
      ['FooBar', 'Bar']
    ];
    const invalidPairs = [
      ['Hello World', 'Hello'],
      ['Hello World', 'World '],
      ['FooBar', 'bar']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} ends with ${argument}`, () => {
        const result = string().endsWith(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not end with ${argument}`, () => {
        const result = string().endsWith(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = string()
        .label('myLabel')
        .endsWith('hello')
        .validate('abc');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.endswith');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('hello');
    });
  });

  describe('equalsCaseInsensitive', () => {
    const validPairs = [
      ['Hello World', 'Hello World'],
      ['FooBar', 'FooBar'],
      ['♠♣♥♦', '♠♣♥♦'],
      ['Woohoo', `woohoo`],
      ['😍', '😍'],
      ['Hello World', 'Hello world']
    ];
    const invalidPairs = [
      ['Hello World', 'Hello  World'],
      ['Fanta', 'SiSi']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is equal to ${argument}`, () => {
        const result = string().equalsCaseInsensitive(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not equal to ${argument}`, () => {
        const result = string().equalsCaseInsensitive(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when length is not a number', () => {
      const validator = string();
      expect(validator.equalsCaseInsensitive.bind(validator, 3 as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = string()
        .label('myLabel')
        .equalsCaseInsensitive('bye')
        .validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.equalscaseinsensitive');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('bye');
      expect(error.message).toContain('case insensitive');
    });
  });

  describe('extendedAscii', () => {
    let extendedAsciiRange = '';
    for (let i = 0; i < 256; i++) {
      extendedAsciiRange += String.fromCharCode(i);
    }
    const validValues = [
      'Hello World!',
      'FooBar~!',
      'Something',
      'not-wrøng',
      extendedAsciiRange
    ];
    const invalidValues = ['♠♣♥♦', '😍'];
    const validator = string().extendedAscii();

    validValues.forEach((value) => {
      it(`${value} is valid extended ascii`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is invalid extended ascii`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('♠♣♥♦');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.extendedascii');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('extended ascii');
    });
  });

  describe('hexColor', () => {
    const validValues = [
      '#000000',
      '#000',
      '#FFFFFF',
      '#ABC',
      '#fFf',
      '#AcDFE3',
      '#3fE'
    ];
    const invalidValues = ['000000', '000', '#EFG', '#DEN', '#ef3g4d'];
    const validator = string().hexColor();

    validValues.forEach((value) => {
      it(`${value} is a valid hex color`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid hex color`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('#EEFFGG');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.hexcolor');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('hex color');
    });
  });

  describe('includes', () => {
    it('calls contains with expectedValue', () => {
      const expectedValue = 'a';
      const validator = string();
      validator.contains = jest.fn();

      expect(validator.contains).not.toBeCalled();

      validator.includes(expectedValue);

      expect(validator.contains).toBeCalledWith(expectedValue);
    });
  });

  describe('isJson', () => {
    const validValues = [
      '{"title":"My Title", "slug": "my-title"}',
      '[ 1, 2, 3 ]',
      '{"number": 3, "boolean": true}',
      '[ "String", 42, true, {} ]',
      '{}',
      '[]'
    ];
    const invalidValues = [
      '"String"', // no single values
      "{ 'Key': 'No Single Quotes'}", // no single quites
      '{"title":"wrong", }', // trailing space
      '[ 1, ]',
      4
    ];
    const validator = string().isJson();

    validValues.forEach((value) => {
      it(`${value} is valid JSON`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is invalid JSON`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('true');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.json');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('JSON');
    });
  });

  describe('length', () => {
    const validPairs = [
      ['Hello World', 11],
      ['Hello', 5],
      ['Hello ', 6],
      ['01', 0x02]
    ];
    const invalidPairs = [
      ['Hello World', 12],
      ['Hello', Number.NaN],
      ['Hello World', -11]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has length ${argument}`, () => {
        const result = string()
          .length(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have length ${argument}`, () => {
        const result = string()
          .length(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when length is not a number', () => {
      const validator = string();
      expect(validator.length.bind(validator, '11' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').length(4).validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.length');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('4');
    });
  });

  describe('lowercase', () => {
    const validValues = [
      'hello world!',
      'some-string',
      'numbers-are-ok-4',
      'ßøàáçèé',
      '😉'
    ];
    const invalidValues = ['HELLO WORLD', 'Hello World', 'H3', 'ÇÈÉ'];
    const validator = string().lowercase();

    validValues.forEach((value) => {
      it(`${value} is all lowercase`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not all lowercase`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('Hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.lowercase');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('lowercase');
    });
  });

  describe('match', () => {
    const validPairs = [
      ['hello world', /^[a-z ]+$/],
      ['Hello World', /hello/i]
    ];
    const invalidPairs = [
      ['Hello World', /hello/],
      ['Hello World', /^[A-Z]$/],
      ['Hello World', /^[a-z ]+$/]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} matches ${argument}`, () => {
        const result = string()
          .match(argument as RegExp)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not match ${argument}`, () => {
        const result = string()
          .match(argument as RegExp)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when pattern is not a RegExp', () => {
      const validator = string();
      expect(validator.match.bind(validator, {} as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').match(/[A-Z]/).validate('2');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.match');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('/[A-Z]/');
    });
  });

  describe('max', () => {
    const validPairs = [
      ['hello', 5],
      ['Hello', 6]
    ];
    const invalidPairs = [
      ['Hello', 4],
      ['Hello World', NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is not longer than ${argument}`, () => {
        const result = string()
          .max(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is longer than ${argument}`, () => {
        const result = string()
          .max(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when maxLength is not a number', () => {
      const validator = string();
      expect(validator.max.bind(validator, '3' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').max(4).validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.max');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('4');
    });
  });

  describe('min', () => {
    const validPairs = [
      ['hello', 4],
      ['Hello', 5]
    ];
    const invalidPairs = [
      ['Hello', 6],
      ['Hello World', NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is not shorter than ${argument}`, () => {
        const result = string()
          .min(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is shorter than ${argument}`, () => {
        const result = string()
          .min(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when minLength is not a number', () => {
      const validator = string();
      expect(validator.min.bind(validator, '3' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = string().label('myLabel').min(6).validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.min');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('6');
    });
  });

  describe('notEmpty', () => {
    const validValues = ['_', 'Hello', 'FooBar', '.'];
    const invalidValues = ['', '  ', '\t', '\n', '\r', '\n  \n\t'];
    const validator = string().notEmpty();

    validValues.forEach((value) => {
      it(`${value} is not empty`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is empty`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('   ');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.notempty');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('empty');
    });
  });

  describe('startsWith', () => {
    const validPairs = [
      ['Hello World', 'Hello'],
      ['Hello World', 'He'],
      ['FooBar', 'Foo']
    ];
    const invalidPairs = [
      ['Hello World', 'World'],
      ['Hello World', ' Hello'],
      ['FooBar', 'foo'],
      ['2FooBar', '2f']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} starts with ${argument}`, () => {
        const result = string().startsWith(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not starts ${argument}`, () => {
        const result = string().startsWith(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = string()
        .label('myLabel')
        .startsWith('hello')
        .validate('bye');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.startswith');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('hello');
    });
  });

  describe('uppercase', () => {
    const validValues = [
      'HELLO WORLD!',
      'SOME_STRING',
      'NUMBERS-ARE-OK-4',
      'ÀÁØÇÈÉ',
      '😉'
    ];
    const invalidValues = ['hello world', 'Hello World', 'h3', 'ßøàáçèé'];
    const validator = string().uppercase();

    validValues.forEach((value) => {
      it(`${value} is all uppercase`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not all uppercase`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('hello');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('string.uppercase');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('uppercase');
    });
  });
});
