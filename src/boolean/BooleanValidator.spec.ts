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
        const result = await validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid boolean value`, async () => {
        const result = await validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = boolean().label('myLabel').validate('true');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('boolean.boolean');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('boolean');
    });
  });

  describe('false', () => {
    const validValues = [false];
    const invalidValues = [true];
    const validator = boolean().false();

    validValues.forEach((value) => {
      it(`${value} is false`, async () => {
        const result = await validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not false`, async () => {
        const result = await validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate(true);
      const error = result.errors?.[0]!;
      expect(error.type).toBe('boolean.false');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('false');
    });
  });

  describe('true', () => {
    const validValues = [true];
    const invalidValues = [false];
    const validator = boolean().true();

    validValues.forEach((value) => {
      it(`${value} is true`, async () => {
        const result = await validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not true`, async () => {
        const result = await validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate(false);
      const error = result.errors?.[0]!;
      expect(error.type).toBe('boolean.true');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('true');
    });
  });
});
