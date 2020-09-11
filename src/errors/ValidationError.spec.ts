import { ValidationError } from './ValidationError';

describe('ValidationError', () => {
  it('extends Error', () => {
    const error = new ValidationError('message');
    expect(error).toBeInstanceOf(Error);
  });

  it('returns errorMessage when not found in locale', () => {
    const locale = {};
    const error = new ValidationError('bla');
    expect(error.format('label', locale)).toBe('bla');
  });

  it('formats message from label and locale', () => {
    const locale = {
      'error.a': '{{label}} error a',
      'error.b': '{{label}} error b'
    };
    const error = new ValidationError('error.a');
    expect(error.format('labelName', locale)).toBe('labelName error a');
  });

  it('adds context to formatted message', () => {
    const context = {
      value: 'MyValue'
    };
    const locale = {
      'error.a': '{{label}} error a',
      'error.b': '{{label}} error b with value: {{value}}'
    };
    const error = new ValidationError('error.b', context);
    expect(error.format('myLabel', locale)).toBe(
      'myLabel error b with value: MyValue'
    );
  });

  it('caches formatted message', () => {
    const locale = {
      'error.a': '{{label}} error a',
      'error.b': '{{label}} error b'
    };
    const error = new ValidationError('error.a');

    expect(error).not.toHaveProperty('formattedMessage');
    expect(error.format('myLabel', locale)).toBe('myLabel error a');

    expect(error).toHaveProperty('formattedMessage', 'myLabel error a');
    expect(error.format('myLabel', locale)).toBe('myLabel error a');
  });
});
