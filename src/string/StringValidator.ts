import { BaseValidator } from '../BaseValidator';
import { ValidatorOptions } from '../types';
import { ValidationError } from '../errors/ValidationError';

export class StringValidator extends BaseValidator<string> {
  constructor(options: Partial<ValidatorOptions> = {}) {
    super(options);

    return this.custom((value: any) => {
      if (typeof value !== 'string') throw new ValidationError('string.string');
      return value;
    });
  }

  /** Expect value to only contain ascii characters */
  ascii() {
    return this.match(/^[\x00-\x7F]*$/, 'string.ascii');
  }

  /** Expect value to be a valid base64 encoded string */
  base64() {
    return this.custom((value: string) => {
      if (!/^[A-Za-z0-9+/=]*$/.test(value))
        throw new ValidationError('string.base64');

      // base64 length must be a multiple of 4
      if (value.length % 4 !== 0) throw new ValidationError('string.base64');

      const indexOfEqualSign = value.indexOf('=');

      // Equal sign can only occur at last 2 positions
      if (indexOfEqualSign > -1 && indexOfEqualSign < value.length - 2)
        throw new ValidationError('string.base64');

      // Equal sign can only be second last if last position is also an equal sign
      if (indexOfEqualSign === value.length - 2 && !value.endsWith('='))
        throw new ValidationError('string.base64');

      return value;
    });
  }

  /** Expect length of value to be between `minLength` and `maxLength`. Both inclusive */
  between(minLength: number, maxLength: number) {
    if (minLength > maxLength) {
      [minLength, maxLength] = [maxLength, minLength];
    }

    return this.min(minLength).max(maxLength);
  }

  /** Expect value to contain `expectedValue` */
  contains(expectedValue: string) {
    return this.custom((value: string) => {
      if (!value.includes(expectedValue))
        throw new ValidationError('string.contains', { expectedValue });
      return value;
    });
  }

  /** Expect value to be empty (spaces, tabs, new lines or nothing) */
  empty() {
    return this.match(/^[\s]*$/, 'string.empty');
  }

  /** Expect value to end with `expectedEnd` */
  endsWith(expectedEnd: string) {
    return this.custom((value: string) => {
      if (!value.endsWith(expectedEnd))
        throw new ValidationError('string.endswith', { expectedEnd });
      return value;
    });
  }

  /** Expect value to equal `expectedValue` but case insensitive */
  equalsCaseInsensitive(expectedValue: string) {
    if (typeof expectedValue !== 'string')
      throw new TypeError(
        'StringValidator.equalsCaseInsensitive: expectedValue must be a string'
      );

    return this.custom((value: string) => {
      if (value.toLocaleLowerCase() !== expectedValue.toLocaleLowerCase())
        throw new ValidationError('string.equalscaseinsensitive', {
          expectedValue
        });
      return value;
    });
  }

  /** Expect value to only contain extended ascii characters */
  extendedAscii() {
    return this.match(/^[\x00-\xFF]*$/, 'string.extendedascii');
  }

  /** Expect value to be a valid hex color */
  hexColor() {
    return this.match(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, 'string.hexcolor');
  }

  /** Expect value to include `expectedValue` */
  includes(expectedValue: string) {
    return this.contains(expectedValue);
  }

  /** Expect value to be valid JSON. Uses `JSON.parse` under the hood, so be careful with large values */
  isJson() {
    return this.custom((value: string) => {
      try {
        const data = JSON.parse(value);

        // Valid JSON should always be an object or array.
        if (typeof data !== 'object') throw new ValidationError('string.json');

        return value;
      } catch {
        throw new ValidationError('string.json');
      }
    });
  }

  /** Expect value to have exact length of `expectedLength` */
  length(expectedLength: number) {
    if (typeof expectedLength !== 'number')
      throw new TypeError(
        'StringValidator.length: expectedlength must be a number'
      );

    return this.custom((value: string) => {
      if (value.length !== expectedLength)
        throw new ValidationError('string.length', {
          expectedLength: `${expectedLength}`
        });
      return value;
    });
  }

  /** Expect value to be in all lowercase */
  lowercase() {
    return this.custom((value: string) => {
      if (value !== value.toLocaleLowerCase())
        throw new ValidationError('string.lowercase');
      return value;
    });
  }

  /** Expect value to match RegExp `pattern` */
  match(pattern: RegExp, errorMessage: string = 'string.match') {
    if (!(pattern instanceof RegExp))
      throw new TypeError(
        'StringValidator.match: pattern must be an instance of RegExp'
      );

    return this.custom((value: string) => {
      if (!pattern.test(value))
        throw new ValidationError(errorMessage, { pattern: `${pattern}` });
      return value;
    });
  }

  /** Expect length of value to be at most `maxLength` (inclusive) */
  max(maxLength: number) {
    if (typeof maxLength !== 'number')
      throw new TypeError('StringValidator.max: maxlength must be a number');

    return this.custom((value: string) => {
      if (value.length <= maxLength) return value;
      throw new ValidationError('string.max', { maxLength: `${maxLength}` });
    });
  }

  /** Expect length of value to be at least `minLength` (inclusive) */
  min(minLength: number) {
    if (typeof minLength !== 'number')
      throw new TypeError('StringValidator min: minlength must be a number');

    return this.custom((value: string) => {
      if (value.length >= minLength) return value;
      throw new ValidationError('string.min', { minLength: `${minLength}` });
    });
    return this;
  }

  /** Expect value to not be empty (spaces, tabs, new lines or nothing) */
  notEmpty() {
    return this.custom((value: string) => {
      if (/^[\s]*$/.test(value)) throw new ValidationError('string.notempty');
      return value;
    });
    return this;
  }

  /** Expect value to start with `expectedStart` */
  startsWith(expectedStart: string) {
    return this.custom((value: string) => {
      if (!value.startsWith(expectedStart))
        throw new ValidationError('string.startswith', { expectedStart });
      return value;
    });
    return this;
  }

  /** Expect value to be in all uppercase */
  uppercase() {
    return this.custom((value: string) => {
      if (value !== value.toLocaleUpperCase())
        throw new ValidationError('string.uppercase');
      return value;
    });
  }
}

export const string = (options: Partial<ValidatorOptions> = {}) =>
  new StringValidator(options);
