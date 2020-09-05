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
      it(`${value} is a valid string value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid string value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is a valid ascii string value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid ascii string value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is a valid base64 value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid base64 value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is between ${argument1} and ${argument2}`, async () => {
        const result = await string()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invaldPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is not between ${argument1} and ${argument2}`, async () => {
        const result = await string()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
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
      it(`${value} contains ${argument}`, async () => {
        const result = await string()
          .contains(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not contains ${argument}`, async () => {
        const result = await string()
          .contains(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('empty', () => {
    const validValues = ['', '  ', '\t', '\n', '\r', '\n  \n\t'];
    const invalidValues = ['_', 'Hello', 'FooBar', '.'];
    const validator = string().empty();

    validValues.forEach((value) => {
      it(`${value} is empty`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not empty`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} ends with ${argument}`, async () => {
        const result = await string()
          .endsWith(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not end with ${argument}`, async () => {
        const result = await string()
          .endsWith(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('enum', () => {
    const validPairs = [
      ['Hello', ['Hello', 'World']],
      ['World', ['Hello', 'World']],
      ['Bar', ['Foo', 'Bar', 'Baz']]
    ];
    const invalidPairs = [
      ['2', [1, 2, 3]],
      ['hello', ['Hello', 'World']],
      ['Hello', ['Hellos']]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is in [${argument}]`, async () => {
        const result = await string()
          .enum(argument as string[])
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not in [${argument}]`, async () => {
        const result = await string()
          .enum(argument as string[])
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when expectedValues is not an array', () => {
      const validator = string();
      expect(validator.enum.bind(validator, {} as any)).toThrow(TypeError);
    });
  });

  describe('equals', () => {
    const validPairs = [
      ['Hello World', 'Hello World'],
      ['FooBar', 'FooBar'],
      ['♠♣♥♦', '♠♣♥♦'],
      ['Woohoo', `Woohoo`],
      ['😍', '😍']
    ];
    const invalidPairs = [
      ['Hello World', 'Hello world'],
      ['Hello World', 'Hello  World'],
      ['Fanta', 'SiSi']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is equal to ${argument}`, async () => {
        const result = await string()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not equal to ${argument}`, async () => {
        const result = await string()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is equal to ${argument}`, async () => {
        const result = await string()
          .equalsCaseInsensitive(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not equal to ${argument}`, async () => {
        const result = await string()
          .equalsCaseInsensitive(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is valid extended ascii`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is invalid extended ascii`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is a valid hex color`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid hex color`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is valid JSON`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is invalid JSON`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} has length ${argument}`, async () => {
        const result = await string()
          .length(argument as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have length ${argument}`, async () => {
        const result = await string()
          .length(argument as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when length is not a number', () => {
      const validator = string();
      expect(validator.length.bind(validator, '11' as any)).toThrow(TypeError);
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
      it(`${value} is all lowercase`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not all lowercase`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('lowerCase', () => {
    it('calls lowercase', () => {
      const validator = string();
      validator.lowercase = jest.fn();

      expect(validator.lowercase).not.toBeCalled();

      validator.lowerCase();

      expect(validator.lowercase).toBeCalled();
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
      it(`${value} matches ${argument}`, async () => {
        const result = await string()
          .match(argument as RegExp)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not match ${argument}`, async () => {
        const result = await string()
          .match(argument as RegExp)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when pattern is not a RegExp', () => {
      const validator = string();
      expect(validator.match.bind(validator, {} as any)).toThrow(TypeError);
    });
  });

  describe('notEmpty', () => {
    const validValues = ['_', 'Hello', 'FooBar', '.'];
    const invalidValues = ['', '  ', '\t', '\n', '\r', '\n  \n\t'];
    const validator = string().notEmpty();

    validValues.forEach((value) => {
      it(`${value} is not empty`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is empty`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('oneOf', () => {
    it('calls enum with expectedValues', () => {
      const expectedValues = ['a'];
      const validator = string();
      validator.enum = jest.fn();

      expect(validator.enum).not.toBeCalled();

      validator.oneOf(expectedValues);

      expect(validator.enum).toBeCalledWith(expectedValues);
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
      it(`${value} starts with ${argument}`, async () => {
        const result = await string()
          .startsWith(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not starts ${argument}`, async () => {
        const result = await string()
          .startsWith(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
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
      it(`${value} is all uppercase`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not all uppercase`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('upperCase', () => {
    it('calls uppercase', () => {
      const validator = string();
      validator.uppercase = jest.fn();

      expect(validator.uppercase).not.toBeCalled();

      validator.upperCase();

      expect(validator.uppercase).toBeCalled();
    });
  });
});
