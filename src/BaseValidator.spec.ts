import { BaseValidator } from './BaseValidator';

class Validator extends BaseValidator {}

describe('BaseValidator', () => {
  it('sets message with withMessage', () => {
    const validator = new Validator();

    expect(validator).toHaveProperty('message', 'Validation error');

    // returns itself
    expect(validator.withMessage('custom error message')).toBe(validator);

    expect(validator).toHaveProperty('message', 'custom error message');
  });

  it('pushes validators with custom method', () => {
    const v1 = jest.fn().mockReturnValue(true);
    const v2 = jest.fn().mockReturnValue(true);
    const validator = new Validator();

    expect(validator).toHaveProperty('validators', []);

    // returns itself
    expect(validator.custom(v1)).toBe(validator);
    expect(validator).toHaveProperty('validators', [v1]);

    validator.custom(v2);
    expect(validator).toHaveProperty('validators', [v1, v2]);
  });

  describe('validate', () => {
    it('calls all validator functions on validate', async () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockReturnValue(true);
      const validator = new Validator();
      validator.custom(v1).custom(v2);

      await validator.validate({ field: 'test', value: 'v' });

      expect(v1).toBeCalledWith('v');
      expect(v2).toBeCalledWith('v');
    });

    it('resolves to null when all validator functions return true', async () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockReturnValue(true);
      const validator = new Validator();
      validator.custom(v1).custom(v2);

      const result = await validator.validate({ field: 'test', value: 'v' });
      expect(result).toBeNull();
    });

    it('resolves to null when all validator functions resolve true', async () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockResolvedValue(true);
      const validator = new Validator();
      validator.custom(v1).custom(v2);

      const result = await validator.validate({ field: 'test', value: 'v' });
      expect(result).toBeNull();
    });

    it('resolves the error message and field when a validator returns false', async () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockReturnValue(false);
      const validator = new Validator();
      validator.custom(v1).custom(v2).withMessage('message');

      const result = await validator.validate({ field: 'test', value: 'v' });
      expect(result).toEqual({
        field: 'test',
        message: 'message'
      });
    });

    it('resolves the error message and field when a validator resolves false', async () => {
      const v1 = jest.fn().mockResolvedValue(false);
      const v2 = jest.fn().mockReturnValue(true);
      const validator = new Validator();
      validator.custom(v1).custom(v2).withMessage('message');

      const result = await validator.validate({ field: 'test', value: 'v' });
      expect(result).toEqual({
        field: 'test',
        message: 'message'
      });
    });

    it('stops the chain of validators after the first false result', async () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockReturnValue(false);
      const v3 = jest.fn().mockReturnValue(true);
      const validator = new Validator();
      validator.custom(v1).custom(v2).custom(v3);

      await validator.validate({ field: 'test', value: 'v' });

      expect(v1).toBeCalled();
      expect(v2).toBeCalled();
      expect(v3).not.toBeCalled();
    });
  });
});
