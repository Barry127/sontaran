import { BaseValidator, ValidatorFunction } from '../BaseValidator';

type NumericValue = number | BigInt;

export class NumberValidator extends BaseValidator {
  protected validators: ValidatorFunction<NumericValue>[] = [];

  constructor() {
    super();

    this.validators.push(
      (value: any) => typeof value === 'number' || typeof value === 'bigint'
    );
  }

  /** Expect value to be between `min` and `max`. Both exclusive */
  between(min: NumericValue, max: NumericValue) {
    return this.greaterThan(min).lessThan(max);
  }

  /** Expect value to be exactly `expectedValue` */
  equals(expectedValue: NumericValue) {
    this.validators.push((value: NumericValue) => value === expectedValue);
    return this;
  }

  /** Expect value to be greater than `gt` */
  greaterThan(gt: NumericValue) {
    if (typeof gt !== 'number' && typeof gt !== 'bigint')
      throw new TypeError(
        'NumberValidator greaterThan: gt must be a number or BigInt'
      );

    this.validators.push((value: NumericValue) => value > gt);
    return this;
  }

  /** Expect value to be greater than `gt` */
  gt(gt: NumericValue) {
    return this.greaterThan(gt);
  }

  /** Expect value to be a BigInt */
  isBigInt() {
    this.validators.push((value: NumericValue) => typeof value === 'bigint');
    return this;
  }

  /** Expect value to be an integer value (also includes BigInt) */
  isInt() {
    this.validators.push((value: NumericValue) => {
      if (typeof value === 'bigint') return true;
      return Number.isInteger(value);
    });
    return this;
  }

  /** Expect value to be an integer value (also includes BigInt) */
  isInteger() {
    return this.isInt();
  }

  /** Expect value to be `NaN` */
  isNaN() {
    this.validators.push((value: NumericValue) => Number.isNaN(value));
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
        'NumberValidator lessThan: lt must be a number or BigInt'
      );

    this.validators.push((value: NumericValue) => value < lt);
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
        'NumberValidator max: max must be a number or BigInt'
      );

    this.validators.push((value: NumericValue) => value <= max);
    return this;
  }

  /** Expect value to be at least `min` (inclusive) */
  min(min: NumericValue) {
    if (typeof min !== 'number' && typeof min !== 'bigint')
      throw new TypeError(
        'NumberValidator min: min must be a number or BigInt'
      );

    this.validators.push((value: NumericValue) => value >= min);
    return this;
  }

  /** Expect value to be a valid number */
  notNaN() {
    this.validators.push((value: NumericValue) => !Number.isNaN(value));
    return this;
  }
}

export const number = () => new NumberValidator();

export const integer = () => new NumberValidator().isInt();

export const int = integer;
