import { Sontaran } from './Sontaran';

import en from '../locales/en.json';
import { ValidationError } from './errors/ValidationError';

describe('Sontaran', () => {
  describe('options', () => {
    it('sets default options', () => {
      const validator = new Sontaran();

      //@ts-ignore
      expect(validator.options).toMatchObject({
        abortEarly: true,
        locale: en
      });
    });

    it('overwrites default options', () => {
      const validator = new Sontaran({ abortEarly: false });

      //@ts-ignore
      expect(validator.options).toMatchObject({
        abortEarly: false,
        locale: en
      });
    });
  });

  describe('allow', () => {
    it('calls whitelist with one argument', () => {
      const validator = new Sontaran();
      validator.whitelist = jest.fn();

      expect(validator.whitelist).not.toHaveBeenCalled();
      validator.allow(1);
      expect(validator.whitelist).toHaveBeenCalledWith(1);
    });

    it('calls whitelist with multiple arguments', () => {
      const validator = new Sontaran();
      validator.whitelist = jest.fn();

      expect(validator.whitelist).not.toHaveBeenCalled();
      validator.allow(1, 2, 3);
      expect(validator.whitelist).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe('blacklist', () => {
    const validator = new Sontaran().blacklist('one', 'two');

    it('validates when value is not in blacklist', () => {
      expect(validator.validate('three')).not.toHaveProperty('errors');
    });

    it('errors with base.blacklist when value is in blacklist', () => {
      expect(validator.validate('two').errors?.[0]).toHaveProperty(
        'type',
        'base.blacklist'
      );
    });
  });

  describe('custom', () => {
    it('pushes validators with custom method', () => {
      const v1 = jest.fn().mockReturnValue(true);
      const v2 = jest.fn().mockReturnValue(true);
      const validator = new Sontaran() as any;

      expect(validator.validators).toHaveLength(1);

      expect(validator.custom(v1)).toBe(validator);
      expect(validator.validators[1]).toBe(v1);

      validator.custom(v2);
      expect(validator.validators[2]).toBe(v2);
      expect(validator.validators).toHaveLength(3);
    });
  });

  describe('default', () => {
    it('has no default value by default', () => {
      const validator = new Sontaran();
      expect(validator.validate(undefined)).toMatchObject({
        value: undefined
      });
    });

    it('sets default when value is undefined', () => {
      const validator = new Sontaran().default('default');
      expect(validator.validate(undefined)).toMatchObject({
        value: 'default'
      });
    });

    it('does not set default when value is null or empty string', () => {
      const validator = new Sontaran().default('default');
      expect(validator.validate(null)).toMatchObject({
        value: null
      });
      expect(validator.validate('')).toMatchObject({
        value: ''
      });
    });

    it('sets default value with function', () => {
      let i = 1;
      const counter = () => i++;

      const validator = new Sontaran().default(counter);
      expect(validator.validate(undefined)).toMatchObject({
        value: 1
      });
      expect(validator.validate(undefined)).toMatchObject({
        value: 2
      });
    });
  });

  describe('disallow', () => {
    it('calls blacklist with one argument', () => {
      const validator = new Sontaran();
      validator.blacklist = jest.fn();

      expect(validator.blacklist).not.toHaveBeenCalled();
      validator.disallow(1);
      expect(validator.blacklist).toHaveBeenCalledWith(1);
    });

    it('calls blacklist with multiple arguments', () => {
      const validator = new Sontaran();
      validator.blacklist = jest.fn();

      expect(validator.blacklist).not.toHaveBeenCalled();
      validator.disallow(1, 2, 3);
      expect(validator.blacklist).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe('enum', () => {
    const validPairs = [
      [2, [1, 2, 3]],
      ['Hello', ['Hello', 'World']],
      ['World', ['Hello', 'World']],
      ['Bar', ['Foo', 'Bar', 'Baz']]
    ];
    const invalidPairs = [
      ['2', [1, 2, 3]],
      ['hello', ['Hello', 'World']],
      ['Hello', ['Hellos']],
      [{}, [{}, {}]]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is in [${argument}]`, () => {
        const result = new Sontaran().enum(argument as any[]).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is in [${argument}]`, () => {
        const result = new Sontaran().enum(argument as any[]).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = new Sontaran().enum([1, 2, 3]).validate(4);
      expect(result.errors?.[0].type).toBe('base.enum');
      expect(result.errors?.[0].message).toBe(
        'Value 4 is not allowed for unnamed field. It must be one of [1,2,3]'
      );
    });

    it('throws a type error when expectedValues is not an array', () => {
      const validator = new Sontaran();
      expect(validator.enum.bind(validator, {} as any)).toThrow(TypeError);
    });
  });

  describe('equals', () => {
    const validPairs = [
      ['Hello World', 'Hello World'],
      ['FooBar', 'FooBar'],
      ['♠♣♥♦', '♠♣♥♦'],
      ['Woohoo', `Woohoo`],
      ['😍', '😍'],
      [3, 3],
      [-2, -2],
      [3.33, 3.33],
      [Math.PI, Math.PI],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      [0xc0, 192],
      [BigInt(42), BigInt(42)],
      [true, true],
      [false, false]
    ];
    const invalidPairs = [
      ['Hello World', 'Hello world'],
      ['Hello World', 'Hello  World'],
      ['Fanta', 'SiSi'],
      [4, 8],
      [Math.PI, 3.14],
      [-2, 4],
      [3, -3],
      [Number.NaN, Number.NaN],
      [BigInt(42), 42],
      [true, false],
      [false, true],
      [
        [1, 2],
        [1, 2]
      ],
      [{}, {}]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} equals [${argument}]`, () => {
        const result = new Sontaran().equals(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is in [${argument}]`, () => {
        const result = new Sontaran().equals(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = new Sontaran().equals(1).label('myLabel').validate(2);
      const error = result.errors?.[0];
      expect(error.type).toBe('base.equals');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('1');
      expect(error.message).toContain('2');
    });
  });

  describe('extendLocale', () => {
    it('keeps existing locale and extends it', () => {
      const locale = {
        a: '1',
        b: '2'
      };
      const extendedLocale = {
        c: '3'
      };

      const validator = new Sontaran({ locale }) as any;

      expect(validator.options.locale).toMatchObject({
        a: '1',
        b: '2'
      });

      expect(
        validator.extendLocale(extendedLocale).options.locale
      ).toMatchObject({
        a: '1',
        b: '2',
        c: '3'
      });
    });
  });

  describe('forbidden', () => {
    const validator = new Sontaran().forbidden();

    it('errors with base.forbidden when value is null', () => {
      expect(validator.validate(null).errors?.[0].type).toBe('base.forbidden');
    });

    it('errors with base.forbidden when value is empty string', () => {
      expect(validator.validate('').errors?.[0].type).toBe('base.forbidden');
    });

    it('errors with base.forbidden when value is 0', () => {
      expect(validator.validate(0).errors?.[0].type).toBe('base.forbidden');
    });

    it('does not error when value is undefined', () => {
      expect(validator.validate(undefined)).not.toHaveProperty('errors');
    });
  });

  describe('label', () => {
    it('has a default label', () => {
      const validator = new Sontaran();
      expect(validator).toHaveProperty('_label');
    });

    it('sets label', () => {
      const validator = new Sontaran().label('my-label');
      expect(validator).toHaveProperty('_label', 'my-label');
    });
  });

  describe('oneOf', () => {
    it('calls enum with argument', () => {
      const validator = new Sontaran();
      validator.enum = jest.fn();

      expect(validator.enum).not.toHaveBeenCalled();
      validator.oneOf([1, 2, 3]);
      expect(validator.enum).toHaveBeenCalledWith([1, 2, 3]);
    });
  });

  describe('validate', () => {
    it('calls all validator functions on validate', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation((v) => v);
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      validator.validate('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).toBeCalledWith('value');
    });

    it('returns valid and the value when no ValidationError is thrown', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation((v) => v);
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      expect(validator.validate('value')).toEqual({
        valid: true,
        value: 'value'
      });
    });

    it('returns an error and value when a ValidationError is thrown', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      expect(validator.validate('value')).toMatchObject({
        valid: false,
        value: 'value'
      });
    });

    it('stops the chain of validators after the first error', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      validator.validate('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).not.toHaveBeenCalled();
    });

    it('runs all validators when abortEarly is false', () => {
      const v1 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran({ abortEarly: false });
      validator.custom(v1).custom(v2).custom(v3);

      validator.validate('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).toBeCalledWith('value');
    });

    it('sets error field, message and type', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3).label('field');

      //@ts-ignore
      expect(validator.validate('value').errors[0]).toEqual({
        field: 'field',
        message: 'test.error',
        type: 'test.error'
      });
    });

    it('throws an error when a validator function returns a promise (is async)', () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      expect(validator.validate.bind(validator, 'value')).toThrow();
    });

    it('throws an error when validator property async is true', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation((v) => v);
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      //@ts-ignore
      validator.async = true;

      expect(validator.validate.bind(validator, 'value')).toThrow();
    });

    it('throws an error when a validator function throws an error different than ValidationError', () => {
      const v1 = jest.fn().mockImplementation((v) => v);
      const v2 = jest.fn().mockImplementation(() => {
        throw new Error('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => v);
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3).label('field');

      expect(validator.validate.bind(validator, 'value')).toThrow();
    });
  });

  describe('validateAsync', () => {
    it('calls all validator functions on validateAsync', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      await validator.validateAsync('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).toBeCalledWith('value');
    });

    it('returns valid and the value when no ValidationError is thrown', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      expect(await validator.validateAsync('value')).toEqual({
        valid: true,
        value: 'value'
      });
    });

    it('returns an error and value when a ValidationError is thrown', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      expect(await validator.validateAsync('value')).toMatchObject({
        valid: false,
        value: 'value'
      });
    });

    it('stops the chain of validators after the first error', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3);

      await validator.validateAsync('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).not.toHaveBeenCalled();
    });

    it('runs all validators when abortEarly is false', async () => {
      const v1 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran({ abortEarly: false });
      validator.custom(v1).custom(v2).custom(v3);

      await validator.validateAsync('value');

      expect(v1).toBeCalledWith('value');
      expect(v2).toBeCalledWith('value');
      expect(v3).toBeCalledWith('value');
    });

    it('sets error field, message and type', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation(() => {
        throw new ValidationError('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3).label('field');

      expect(
        ((await validator.validateAsync('value')) as any).errors[0]
      ).toEqual({
        field: 'field',
        message: 'test.error',
        type: 'test.error'
      });
    });

    it('throws an error when a validator function throws an error different than ValidationError', async () => {
      const v1 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const v2 = jest.fn().mockImplementation(() => {
        throw new Error('test.error');
      });
      const v3 = jest.fn().mockImplementation((v) => Promise.resolve(v));
      const validator = new Sontaran();
      validator.custom(v1).custom(v2).custom(v3).label('field');

      await expect(validator.validateAsync('value')).rejects.toThrow();
    });
  });

  describe('whitelist', () => {
    const validator = new Sontaran().whitelist('one', 'two').custom((value) => {
      if (value === 'one')
        throw new ValidationError('This error is never thrown');
      return value;
    });

    it('always validates when value is in whitelist', async () => {
      expect(validator.validate('one')).not.toHaveProperty('errors');
      expect(await validator.validateAsync('one')).not.toHaveProperty('errors');
    });
  });
});
