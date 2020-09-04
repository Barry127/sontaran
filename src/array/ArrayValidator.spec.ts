import { ArrayValidator, array } from './ArrayValidator';
import { number, string } from '../index';
import { BaseValidator } from '../BaseValidator';

describe('ArrayValidator', () => {
  it('exports factory method', () => {
    expect(array()).toBeInstanceOf(ArrayValidator);
  });

  describe('array validation', () => {
    const validValues = [
      [1, 2, 3],
      [1, 'a', /[a-z]/]
    ];
    const invalidValues = [{}, new Set()];
    const validator = array();

    validValues.forEach((value) => {
      it(`${value} is a valid array`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid array`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('between', () => {
    const validPairs = [
      [['a', 'b', 'c', 'd'], 3, 5],
      [['a', 'b'], 1, 3],
      [[1, 2, 3, 4, 5, 6], 0, Number.POSITIVE_INFINITY],
      [['a', 'b', 'c'], 3, 4],
      [['a', 'b', 'c'], 2, 3],
      [[1], Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
    ];
    const invalidPairs = [
      [['a', 'b', 'c', 'd'], 6, 5],
      [['a', 'b'], 4, 6]
    ];

    validPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is between ${argument1} and ${argument2}`, async () => {
        const result = await array()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is not between ${argument1} and ${argument2}`, async () => {
        const result = await array()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('between throws a TypeError when min is not a number', () => {
      const validator = array();
      expect(validator.between.bind(validator, '4', 3)).toThrow(TypeError);
    });

    it('between throws a TypeError when max is not a number', () => {
      const validator = array();
      expect(validator.between.bind(validator, 4, '6')).toThrow(TypeError);
    });
  });

  describe('contains', () => {
    const validPairs = [
      [['a', 'b', 'c'], 'b'],
      [['a', 'b', 'c'], 'a'],
      [[1, 2, 3], 2],
      [[255, 333], 0xff]
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], 'A'],
      [['a', 'b', 'c'], 'd'],
      [['abc'], 'c']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} contains ${argument}`, async () => {
        const result = await array()
          .contains(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not contains ${argument}`, async () => {
        const result = await array()
          .contains(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('each', () => {
    const validPairs = [
      [[1, 0, 2, 2, 1], number().lessThan(3)],
      [['a', 'ab', 'abc'], string().startsWith('a')]
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], string().startsWith('a')],
      [['1', 2], number()],
      [[1, 2, 3], number().lessThan(3)]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is valid`, async () => {
        const result = await array()
          .each(argument as BaseValidator)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is invalid`, async () => {
        const result = await array()
          .each(argument as BaseValidator)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('each throws a TypeError when validator is not an instance of Sontaran BaseValidator', () => {
      const validator = array();
      expect(validator.each.bind(validator, () => null)).toThrow(TypeError);
    });

    it('calls validate the length of value number of times', async () => {
      const spy = jest.fn().mockReturnValue(null);
      const validator = array();
      validator.validate = spy;

      await array()
        .each(validator)
        .validate({ field: 'test', value: [1, 2, 3] });

      expect(spy).toBeCalledTimes(3);
    });

    it('passes the value as argument to validator', async () => {
      const spy = jest.fn().mockReturnValue(null);
      const validator = array();
      validator.validate = spy;

      await array()
        .each(validator)
        .validate({ field: 'test', value: ['a', 'b', 'c'] });

      expect(spy.mock.calls[0][0]).toMatchObject({ value: 'a' });
      expect(spy.mock.calls[1][0]).toMatchObject({ value: 'b' });
      expect(spy.mock.calls[2][0]).toMatchObject({ value: 'c' });
    });
  });

  describe('equals', () => {
    const validPairs = [
      [
        [1, 2],
        [1, 2]
      ],
      [
        ['a', 'b', 'c'],
        ['a', 'b', 'c']
      ],
      [[255], [0xff]]
    ];
    const invalidPairs = [
      [
        ['a', 'b', 'c'],
        ['a', 'b']
      ],
      [
        ['1', 2],
        [1, 2]
      ],
      [[{ a: 1, b: 2 }], [{ a: 1, b: 2 }]],
      [
        ['a', 'b', 'c'],
        ['b', 'a', 'c']
      ],
      [
        [1, 2, 3],
        [3, 2, 1]
      ],
      [['a'], ['a', 'b']]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} equals ${argument}`, async () => {
        const result = await array()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not equals ${argument}`, async () => {
        const result = await array()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('equals throws a TypeError when expectedValue is not an Array', () => {
      const validator = array();
      expect(validator.equals.bind(validator, {})).toThrow(TypeError);
    });
  });

  describe('includes', () => {
    it('calls contains with expectedValue', () => {
      const expectedValue = 'a';
      const validator = array();
      validator.contains = jest.fn();

      expect(validator.contains).not.toBeCalled();

      validator.includes(expectedValue);

      expect(validator.contains).toBeCalledWith(expectedValue);
    });
  });

  describe('isSubsetOf', () => {
    const validPairs = [
      [
        [1, 2],
        [1, 2]
      ],
      [
        ['a', 'b', 'c'],
        ['a', 'b', 'c', 'd']
      ],
      [
        ['a', 'b', 'c'],
        ['b', 'a', 'c']
      ],
      [
        [1, 2, 3],
        [5, 4, 3, 2, 1]
      ],
      [[255], [0xff, 0xfe, 0xfd]]
    ];
    const invalidPairs = [
      [
        ['a', 'b', 'c'],
        ['a', 'b']
      ],
      [
        ['1', 2],
        [1, 2]
      ],
      [[{ a: 1, b: 2 }], [{ a: 1, b: 2 }]],
      [['c'], ['a', 'b']]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is a subset of ${argument}`, async () => {
        const result = await array()
          .isSubsetOf(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not a subset of ${argument}`, async () => {
        const result = await array()
          .isSubsetOf(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('isSubsetOf throws a TypeError when superset is not an Array', () => {
      const validator = array();
      expect(validator.isSubsetOf.bind(validator, {})).toThrow(TypeError);
    });
  });

  describe('isSupersetOf', () => {
    const validPairs = [
      [
        [1, 2],
        [1, 2]
      ],
      [
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c']
      ],
      [
        ['a', 'b', 'c'],
        ['b', 'a', 'c']
      ],
      [
        [5, 4, 3, 2, 1],
        [1, 2, 3]
      ],
      [[0xff, 0xfe, 0xfd], [255]]
    ];
    const invalidPairs = [
      [
        ['a', 'b'],
        ['a', 'b', 'c']
      ],
      [
        ['1', 2],
        [1, 2]
      ],
      [[{ a: 1, b: 2 }], [{ a: 1, b: 2 }]],
      [['a'], ['a', 'b']]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is a superset of ${argument}`, async () => {
        const result = await array()
          .isSupersetOf(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not a superset of ${argument}`, async () => {
        const result = await array()
          .isSupersetOf(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('isSupersetOf throws a TypeError when superset is not an Array', () => {
      const validator = array();
      expect(validator.isSupersetOf.bind(validator, {})).toThrow(TypeError);
    });
  });

  describe('length', () => {
    const validPairs = [
      [['a', 'b', 'c'], 3],
      [['a', 'b', 'c', 'd'], 4],
      [[1], 1],
      [[255, 333], 0x02]
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], 2],
      [['a', 'b', 'c'], -3],
      [[1, 2, 3], Number.NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has length ${argument}`, async () => {
        const result = await array()
          .length(argument as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} has not length ${argument}`, async () => {
        const result = await array()
          .length(argument as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('length throws a TypeError when expectedLength is not an number', () => {
      const validator = array();
      expect(validator.length.bind(validator, '2')).toThrow(TypeError);
    });
  });

  describe('max', () => {
    const validPairs = [
      [['a', 'b', 'c'], 5],
      [['a', 'b', 'c', 'd'], 4],
      [[1], 1],
      [[255, 333], 0xff]
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], 2],
      [['a', 'b', 'c'], -3],
      [[1, 2, 3], Number.NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`length of ${value} is not greater than ${argument}`, async () => {
        const result = await array()
          .max(argument as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`length of ${value} is greater than ${argument}`, async () => {
        const result = await array()
          .max(argument as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('max throws a TypeError when maxLength is not an number', () => {
      const validator = array();
      expect(validator.max.bind(validator, '2')).toThrow(TypeError);
    });
  });

  describe('min', () => {
    const validPairs = [
      [['a', 'b', 'c'], 2],
      [['a', 'b', 'c', 'd'], 4],
      [[1], 1],
      [[255, 333], 0x00]
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], 4],
      [['a', 'b', 'c'], 0b100],
      [[1, 2, 3], Number.NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`length of ${value} is not less than ${argument}`, async () => {
        const result = await array()
          .min(argument as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`length of ${value} is less than ${argument}`, async () => {
        const result = await array()
          .min(argument as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('min throws a TypeError when minLength is not an number', () => {
      const validator = array();
      expect(validator.min.bind(validator, '2')).toThrow(TypeError);
    });
  });

  describe('of', () => {
    const validPairs = [
      [['a', 'b', 'c'], 'string'],
      [[1, 2, 3, 0xff], 'number'],
      [[{}, {}], 'object'],
      [[true, true, false], 'boolean'],
      [[BigInt(4), BigInt(2)], 'bigint'],
      [[[], [], []], 'array'],
      [[[], [], []], 'object']
    ];
    const invalidPairs = [
      [['a', 'b', 'c'], 'number'],
      [['a', 'b', 2], 'string'],
      [['abc', 0x7], 'string'],
      [[0, true], 'boolean'],
      [[{}, []], 'array'],
      [[1, 2, 3], 'integer'],
      [[BigInt(42)], 'number'],
      [[3, 3, 3], '3'],
      [[3, 3, 3], 'numeric']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is an array of ${argument}`, async () => {
        const result = await array()
          .of(argument as any)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not an array of ${argument}`, async () => {
        const result = await array()
          .of(argument as any)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });
});
