import { BooleanValidator, boolean, bool } from './BooleanValidator';

describe('BooleanValidator', () => {
  it('exports factory methods', () => {
    expect(boolean()).toBeInstanceOf(BooleanValidator);
    expect(bool()).toBeInstanceOf(BooleanValidator);
  });

  describe('boolean validation', () => {
    const validValues = [true, false];
    const invalidValues = [-1, 0, 1, 'true', 'false', null, undefined];
    const validator = boolean();

    validValues.forEach((value) => {
      it(`${value} is a valid boolean value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid boolean value`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('equal', () => {
    const validPairs = [
      [true, true],
      [false, false]
    ];
    const invalidPairs = [
      [true, false],
      [false, true]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is equal to ${argument}`, async () => {
        const result = await boolean()
          .equal(argument)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not equal to ${argument}`, async () => {
        const result = await boolean()
          .equal(argument)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('false', () => {
    const validValues = [false];
    const invalidValues = [true];
    const validator = boolean().false();

    validValues.forEach((value) => {
      it(`${value} is false`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not false`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('true', () => {
    const validValues = [true];
    const invalidValues = [false];
    const validator = boolean().true();

    validValues.forEach((value) => {
      it(`${value} is true`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not true`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });
});
