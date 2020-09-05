import { NumberValidator, int, integer, number } from './NumberValidator';

describe('NumberValidator', () => {
  it('exports factory methods', () => {
    expect(number()).toBeInstanceOf(NumberValidator);
    expect(integer()).toBeInstanceOf(NumberValidator);
    expect(int()).toBeInstanceOf(NumberValidator);
  });

  describe('number validation', () => {
    const validValues = [
      42,
      -3,
      0,
      3.33,
      -5.2,
      Math.PI,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      0xff,
      3.1e12,
      0b011,
      0o55,
      32e-4,
      BigInt(10)
    ];
    const invalidValues = ['42', '-3', true, null, '#4'];
    const validator = number();

    validValues.forEach((value) => {
      it(`${value} is a valid number`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid number`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('between', () => {
    const validPairs = [
      [4, 3, BigInt(5)],
      [-2, -5, -1],
      [Math.PI, 3, 4]
    ];
    const invalidPairs = [
      [3, 3, 5],
      [Number.NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
      [2, 0, Number.NaN],
      [4, 0, 3]
    ];

    validPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is between ${argument1} and ${argument2}`, async () => {
        const result = await number()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument1, argument2]) => {
      it(`${value} is not between ${argument1} and ${argument2}`, async () => {
        const result = await number()
          .between(argument1 as number, argument2 as number)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when min is not a number or BigInt', () => {
      const validator = number();
      expect(validator.between.bind(validator, '4' as any, 5)).toThrow(
        TypeError
      );
    });

    it('throws a type error when max is not a number or BigInt', () => {
      const validator = number();
      expect(validator.between.bind(validator, 4, '5' as any)).toThrow(
        TypeError
      );
    });
  });

  describe('equals', () => {
    const validPairs = [
      [3, 3],
      [-2, -2],
      [3.33, 3.33],
      [Math.PI, Math.PI],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      [0xc0, 192],
      [BigInt(42), BigInt(42)]
    ];
    const invalidPairs = [
      [4, 8],
      [Math.PI, 3.14],
      [-2, 4],
      [3, -3],
      [Number.NaN, Number.NaN],
      [BigInt(42), 42]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is equal to ${argument}`, async () => {
        const result = await number()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not equal to ${argument}`, async () => {
        const result = await number()
          .equals(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('greaterThan', () => {
    const validPairs = [
      [3, 2],
      [-2, -6],
      [3, Number.NEGATIVE_INFINITY],
      [BigInt(3), BigInt(2)],
      [BigInt(3), 2],
      [3.14, BigInt(2)]
    ];
    const invalidPairs = [
      [4, 4],
      [Math.PI, 4],
      [4, Number.NaN],
      [Number.NaN, Number.NEGATIVE_INFINITY],
      [2, 0x03]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is greater than ${argument}`, async () => {
        const result = await number()
          .greaterThan(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not greater than ${argument}`, async () => {
        const result = await number()
          .greaterThan(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when gt is not a number or BigInt', () => {
      const validator = number();
      expect(validator.greaterThan.bind(validator, '4' as any)).toThrow(
        TypeError
      );
    });
  });

  describe('gt', () => {
    it('calls greaterThan with gt', () => {
      const gt = 3.14;
      const validator = number();
      validator.greaterThan = jest.fn();

      expect(validator.greaterThan).not.toBeCalled();

      validator.gt(gt);

      expect(validator.greaterThan).toBeCalledWith(gt);
    });
  });

  describe('isBigInt', () => {
    const validValues = [BigInt(-42), BigInt(0), BigInt(102)];
    const invalidValues = [4, 3.14];
    const validator = number().isBigInt();

    validValues.forEach((value) => {
      it(`${value} is a BigInt`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a BigInt`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('isInt', () => {
    const validValues = [
      42,
      -3,
      0 - 0,
      0xff,
      3.1e12,
      0b011,
      6.0,
      0o55,
      BigInt(42)
    ];
    const invalidValues = [
      3.33,
      Math.PI,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ];

    const validator = number().isInt();

    validValues.forEach((value) => {
      it(`${value} is an integer`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not an integer`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('isInteger', () => {
    it('calls isInt', () => {
      const validator = number();
      validator.isInt = jest.fn();

      expect(validator.isInt).not.toBeCalled();

      validator.isInteger();

      expect(validator.isInt).toBeCalled();
    });
  });

  describe('isNaN', () => {
    const validValues = [Number.NaN, Math.sqrt(-3)];
    const invalidValues = [4.3, Math.PI, 5, -9, BigInt(3)];
    const validator = number().isNaN();

    validValues.forEach((value) => {
      it(`${value} is NaN`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not NaN`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('isNegative', () => {
    const validValues = [
      -3,
      -0xcc,
      -2.1e3,
      Number.NEGATIVE_INFINITY,
      -6.0,
      -0o32,
      BigInt(-42)
    ];
    const invalidValues = [
      0,
      -0,
      3.33,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      BigInt(1)
    ];
    const validator = number().isNegative();

    validValues.forEach((value) => {
      it(`${value} is negative`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not negative`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('isPositive', () => {
    const validValues = [
      42,
      0xca,
      4.3e6,
      Number.POSITIVE_INFINITY,
      6.0,
      0o43,
      BigInt(42)
    ];
    const invalidValues = [
      0,
      -0,
      -3,
      -0xcc,
      -2.1e3,
      Number.NEGATIVE_INFINITY,
      -6.0,
      -0o32,
      Number.NaN,
      BigInt(-4)
    ];
    const validator = number().isPositive();

    validValues.forEach((value) => {
      it(`${value} is positive`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not positive`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('lessThan', () => {
    const validPairs = [
      [2, 3],
      [-6, -2],
      [3, Number.POSITIVE_INFINITY],
      [BigInt(2), BigInt(3)],
      [BigInt(2), 3.14],
      [2, BigInt(3)]
    ];
    const invalidPairs = [
      [4, 4],
      [4, Math.PI],
      [4, Number.NaN],
      [Number.NaN, Number.POSITIVE_INFINITY],
      [0x03, 2]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is less than ${argument}`, async () => {
        const result = await number()
          .lessThan(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not less than ${argument}`, async () => {
        const result = await number()
          .lessThan(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when lt is not a number or BigInt', () => {
      const validator = number();
      expect(validator.lessThan.bind(validator, '4' as any)).toThrow(TypeError);
    });
  });

  describe('lt', () => {
    it('calls lessThan with lt', () => {
      const lt = 3.14;
      const validator = number();
      validator.lessThan = jest.fn();

      expect(validator.lessThan).not.toBeCalled();

      validator.lt(lt);

      expect(validator.lessThan).toBeCalledWith(lt);
    });
  });

  describe('max', () => {
    const validPairs = [
      [2, 3],
      [4, 4],
      [Number.NEGATIVE_INFINITY, 3],
      [BigInt(4), 5],
      [BigInt(4), BigInt(5)],
      [4, BigInt(5)]
    ];
    const invalidPairs = [
      [Math.PI, 3],
      [4, Number.NaN],
      [Number.NaN, Number.POSITIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.NaN],
      [2, 0x01]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is not greater than ${argument}`, async () => {
        const result = await number()
          .max(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is greater than ${argument}`, async () => {
        const result = await number()
          .max(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when max is not a number or BigInt', () => {
      const validator = number();
      expect(validator.min.bind(validator, '4' as any)).toThrow(TypeError);
    });
  });

  describe('min', () => {
    const validPairs = [
      [3, 2],
      [4, 4],
      [Number.POSITIVE_INFINITY, 3],
      [BigInt(5), 4],
      [BigInt(5), BigInt(4)],
      [5, BigInt(4)]
    ];
    const invalidPairs = [
      [3, Math.PI],
      [4, Number.NaN],
      [Number.NaN, Number.NEGATIVE_INFINITY],
      [Number.NEGATIVE_INFINITY, Number.NaN],
      [2, 0x03]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is not less than ${argument}`, async () => {
        const result = await number()
          .min(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is less than ${argument}`, async () => {
        const result = await number()
          .min(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when min is not a number or BigInt', () => {
      const validator = number();
      expect(validator.min.bind(validator, '4' as any)).toThrow(TypeError);
    });
  });

  describe('notNaN', () => {
    const validValues = [4.3, Math.PI, 5, -9, BigInt(42)];
    const invalidValues = [Number.NaN, Math.sqrt(-3)];

    const validator = number().notNaN();

    validValues.forEach((value) => {
      it(`${value} is not NaN`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is NaN`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });
});
