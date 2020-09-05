import { BaseValidator, ValidatorFunction } from '../BaseValidator';

export class StringValidator extends BaseValidator {
  protected validators: ValidatorFunction<string>[] = [];

  constructor() {
    super();

    this.validators.push((value: any) => typeof value === 'string');
  }

  /** Expect value to only contain ascii characters */
  ascii() {
    return this.match(/^[\x00-\x7F]*$/);
  }

  /** Expect value to be a valid base64 encoded string */
  base64() {
    this.validators.push((value: string) => {
      if (!/^[A-Za-z0-9+/=]*$/.test(value)) return false;

      // base64 length must be a multiple of 4
      if (value.length % 4 !== 0) return false;

      const indexOfEqualSign = value.indexOf('=');

      // Equal sign can only occur at last 2 positions
      if (indexOfEqualSign > -1 && indexOfEqualSign < value.length - 2)
        return false;

      // Equal sign can only be second last if last position is also an equal sign
      if (indexOfEqualSign === value.length - 2 && !value.endsWith('='))
        return false;

      return true;
    });

    return this;
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
    this.validators.push((value: string) => value.includes(expectedValue));
    return this;
  }

  /** Expect value to be empty (spaces, tabs, new lines or nothing) */
  empty() {
    return this.match(/^[\s]*$/);
  }

  /** Expect value to end with `expectedEnd` */
  endsWith(expectedEnd: string) {
    this.validators.push((value: string) => value.endsWith(expectedEnd));
    return this;
  }

  /** Expect value to equal one of `expectedValues` */
  enum(expectedValues: string[]) {
    if (!Array.isArray(expectedValues))
      throw new TypeError(
        'StringValidator enum: exectedValues must by an array'
      );

    this.validators.push((value: string) => expectedValues.includes(value));
    return this;
  }

  /** Expect value to equal `expectedValue` */
  equals(expectedValue: string) {
    this.validators.push((value: string) => value === expectedValue);
    return this;
  }

  /** Expect value to equal `expectedValue` but case insensitive */
  equalsCaseInsensitive(expectedValue: string) {
    this.validators.push(
      (value: string) =>
        value.toLocaleLowerCase() === expectedValue?.toLocaleLowerCase()
    );
    return this;
  }

  /** Expect value to only contain extended ascii characters */
  extendedAscii() {
    return this.match(/^[\x00-\xFF]*$/);
  }

  /** Expect value to be a valid hex color */
  hexColor() {
    return this.match(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i);
  }

  /** Expect value to include `expectedValue` */
  includes(expectedValue: string) {
    return this.contains(expectedValue);
  }

  /** Expect value to be valid JSON. Uses `JSON.parse` under the hood, so be careful with large values */
  isJson() {
    this.validators.push((value: string) => {
      try {
        const data = JSON.parse(value);

        // Valid JSON should always be an object or array.
        if (typeof data !== 'object') return false;

        return true;
      } catch {
        return false;
      }
    });
    return this;
  }

  /** Expect value to have exact length of `expectedLength` */
  length(expectedLength: number) {
    if (typeof expectedLength !== 'number')
      throw new TypeError(
        'StringValidator length: expectedlength must be a number'
      );

    this.validators.push((value: string) => value.length === expectedLength);
    return this;
  }

  /** Expect value to be in all lowercase */
  lowercase() {
    this.validators.push(
      (value: string) => value === value.toLocaleLowerCase()
    );
    return this;
  }

  /** Expect value to be in all lowercase */
  lowerCase() {
    return this.lowercase();
  }

  /** Expect value to match RegExp `pattern` */
  match(pattern: RegExp) {
    if (!(pattern instanceof RegExp))
      throw new TypeError(
        'StringValidator match: pattern must be an instance of RegExp'
      );

    this.validators.push((value: string) => pattern.test(value));
    return this;
  }

  /** Expect length of value to be at most `maxLength` (inclusive) */
  max(maxLength: number) {
    if (typeof maxLength !== 'number')
      throw new TypeError('StringValidator max: maxlength must be a number');

    this.validators.push((value: string) => value.length <= maxLength);
    return this;
  }

  /** Expect length of value to be at least `minLength` (inclusive) */
  min(minLength: number) {
    if (typeof minLength !== 'number')
      throw new TypeError('StringValidator min: minlength must be a number');

    this.validators.push((value: string) => value.length >= minLength);
    return this;
  }

  /** Expect value to not be empty (spaces, tabs, new lines or nothing) */
  notEmpty() {
    this.validators.push((value: string) => !/^[\s]*$/.test(value));
    return this;
  }

  /** Expect value to equal one of `expectedValues` */
  oneOf(expectedValues: string[]) {
    return this.enum(expectedValues);
  }

  /** Expect value to start with `expectedStart` */
  startsWith(expectedStart: string) {
    this.validators.push((value: string) => value.startsWith(expectedStart));
    return this;
  }

  /** Expect value to be in all uppercase */
  uppercase() {
    this.validators.push(
      (value: string) => value === value.toLocaleUpperCase()
    );
    return this;
  }

  /** Expect value to be in all uppercase */
  upperCase() {
    return this.uppercase();
  }
}

export const string = () => new StringValidator();
