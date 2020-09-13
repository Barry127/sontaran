import { BaseValidator } from '../BaseValidator';
import { ValidationError } from '../errors/ValidationError';
import { ValidatorOptions } from '../types';

type NumericValue = number | BigInt;

export class NumberValidator extends BaseValidator<NumericValue> {
  constructor(options: Partial<ValidatorOptions> = {}) {
    super(options);

    this.custom((value: any) => {
      if (typeof value !== 'number' && typeof value !== 'bigint')
        throw new ValidationError('number.number');

      return value;
    });
  }

  /** Expect value to be between `min` and `max`. Both exclusive */
  between(min: NumericValue, max: NumericValue) {
    return this.greaterThan(min).lessThan(max);
  }

  /** Expect value to be greater than `gt` */
  greaterThan(gt: NumericValue) {
    if (typeof gt !== 'number' && typeof gt !== 'bigint')
      throw new TypeError(
        'NumberValidator.greaterThan: gt must be a number or BigInt'
      );

    this.custom((value: NumericValue) => {
      if (value > gt) return value;
      throw new ValidationError('number.gt', { gt: `${gt}` });
    });
    return this;
  }

  /** Expect value to be greater than `gt` */
  gt(gt: NumericValue) {
    return this.greaterThan(gt);
  }

  /** Expect value to be a BigInt */
  isBigInt() {
    this.custom((value: NumericValue) => {
      if (typeof value !== 'bigint') throw new ValidationError('number.bigint');

      return value;
    });

    return this;
  }

  /** Expect value to be an integer value (also includes BigInt) */
  isInt() {
    this.custom((value: NumericValue) => {
      if (typeof value === 'bigint') return value;
      if (!Number.isInteger(value)) throw new ValidationError('number.int');

      return value;
    });

    return this;
  }

  /** Expect value to be an integer value (also includes BigInt) */
  isInteger() {
    return this.isInt();
  }

  /** Expect value to be `NaN` */
  isNaN() {
    this.custom((value: NumericValue) => {
      if (!Number.isNaN(value)) throw new ValidationError('number.nan');
      return value;
    });
    return this;
  }

  /** Expect value to be negative */
  isNegative() {
    return this.lessThan(0);
  }

  /** Expect value to be positive */
  isPositive() {
    return this.greaterThan(0);
  }

  /** Expect value to be less than `lt` */
  lessThan(lt: NumericValue) {
    if (typeof lt !== 'number' && typeof lt !== 'bigint')
      throw new TypeError(
        'NumberValidator.lessThan: lt must be a number or BigInt'
      );

    this.custom((value: NumericValue) => {
      if (value < lt) return value;
      throw new ValidationError('number.lt', { lt: `${lt}` });
    });
    return this;
  }

  /** Expect value to be less than `lt` */
  lt(lt: NumericValue) {
    return this.lessThan(lt);
  }

  /** Expect value to be at most `max` (inclusive) */
  max(max: NumericValue) {
    if (typeof max !== 'number' && typeof max !== 'bigint')
      throw new TypeError(
        'NumberValidator.max: max must be a number or BigInt'
      );

    this.custom((value: NumericValue) => {
      if (value <= max) return value;
      throw new ValidationError('number.max', { max: `${max}` });
    });
    return this;
  }

  /** Expect value to be at least `min` (inclusive) */
  min(min: NumericValue) {
    if (typeof min !== 'number' && typeof min !== 'bigint')
      throw new TypeError(
        'NumberValidator.min: min must be a number or BigInt'
      );

    this.custom((value: NumericValue) => {
      if (value >= min) return value;
      throw new ValidationError('number.min', { min: `${min}` });
    });
    return this;
  }

  /** Expect value to be a valid number */
  notNaN() {
    this.custom((value: NumericValue) => {
      if (Number.isNaN(value)) throw new ValidationError('number.notnan');
      return value;
    });
    return this;
  }
}

export const number = (options: Partial<ValidatorOptions> = {}) =>
  new NumberValidator(options);

export const integer = (options: Partial<ValidatorOptions> = {}) =>
  new NumberValidator(options).isInt();

export const int = integer;
