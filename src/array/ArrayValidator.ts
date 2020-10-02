import { BaseValidator, ValidatorOptions } from '../BaseValidator';
import { ValidationError } from '../errors/ValidationError';

export class ArrayValidator extends BaseValidator<any[]> {
  constructor(options: Partial<ValidatorOptions> = {}) {
    super(options);

    this.custom((value: any) => {
      if (!Array.isArray(value)) throw new ValidationError('array.array');
      return value;
    });
  }

  /** Expect length of value array to be between `minLength` and `maxLength`. Both inclusive */
  between(minLength: number, maxLength: number) {
    if (minLength > maxLength) {
      [minLength, maxLength] = [maxLength, minLength];
    }

    return this.min(minLength).max(maxLength);
  }

  /** Expect value array to contain `expectedValue` */
  contains(expectedValue: any) {
    return this.custom((value: any[]) => {
      if (!value.includes(expectedValue))
        throw new ValidationError('array.contains', { expectedValue });
      return value;
    });
  }

  /** Expect every value in array to pass `validator` */
  each(validator: BaseValidator) {
    if (!(validator instanceof BaseValidator))
      throw new TypeError(
        'ArrayValidator.each: validator must be a Sontaran validator'
      );

    return this.custom((value: any[]) => {
      for (let element of value) {
        let result = validator.label('element').validate(element);
        if (!result.valid)
          throw new ValidationError('array.each', {
            message: result.errors?.[0]?.message as string
          });
      }
      return value;
    });
  }

  /** Expect value array to (shallow) equal expectedValue */
  equals(expectedValue: any[]) {
    if (!Array.isArray(expectedValue))
      throw new TypeError(
        'ArrayValidator.equals: exectedValue must by an array'
      );

    return this.custom((value: any[]) => {
      if (value.length !== expectedValue.length)
        throw new ValidationError('array.equals', {
          expectedValue: `${expectedValue}`
        });

      for (let i = 0; i < value.length; i++) {
        if (value[i] !== expectedValue[i])
          throw new ValidationError('array.equals', {
            expectedValue: `${expectedValue}`
          });
      }

      return value;
    });
  }

  /** Expect value array to include `expectedValue` */
  includes(expectedValue: any) {
    return this.contains(expectedValue);
  }

  /** Expect value array to be a subset of `superset`  */
  isSubsetOf(superset: any[]) {
    if (!Array.isArray(superset))
      throw new TypeError(
        'ArrayValidator.isSubsetOf: superset must by an array'
      );

    return this.custom((value: any[]) => {
      for (let element of value) {
        if (!superset.includes(element))
          throw new ValidationError('array.subset', {
            superset: `${superset}`
          });
      }

      return value;
    });
  }

  /** Expect value array to be a superset of `subset`  */
  isSupersetOf(subset: any[]) {
    if (!Array.isArray(subset))
      throw new TypeError(
        'ArrayValidator.isSupersetOf: subset must by an array'
      );

    return this.custom((value: any[]) => {
      for (let element of subset) {
        if (!value.includes(element))
          throw new ValidationError('array.superset', {
            subset: `${subset}`
          });
      }

      return value;
    });
  }

  /** Expect value array to have exact length of `expectedLength` */
  length(expectedLength: number) {
    if (typeof expectedLength !== 'number')
      throw new TypeError(
        'ArrayValidator.length: expectedlength must be a number'
      );

    return this.custom((value: any[]) => {
      if (value.length !== expectedLength)
        throw new ValidationError('array.length', {
          expectedLength: `${expectedLength}`
        });
      return value;
    });
  }

  /** Expect length of value array to be at most `maxLength` (inclusive) */
  max(maxLength: number) {
    if (typeof maxLength !== 'number')
      throw new TypeError('ArrayValidator.max: maxlength must be a number');

    return this.custom((value: any[]) => {
      if (value.length <= maxLength) return value;
      throw new ValidationError('array.max', {
        maxLength: `${maxLength}`
      });
    });
  }

  /** Expect length of value array to be at least `minLength` (inclusive) */
  min(minLength: number) {
    if (typeof minLength !== 'number')
      throw new TypeError('ArrayValidator.min: minlength must be a number');

    return this.custom((value: any[]) => {
      if (value.length >= minLength) return value;
      throw new ValidationError('array.min', {
        minLength: `${minLength}`
      });
    });
  }

  /** expect all elements of value array to be of type `type` */
  of(
    type:
      | 'array'
      | 'bigint'
      | 'boolean'
      | 'function'
      | 'number'
      | 'object'
      | 'string'
  ) {
    if (type?.toLowerCase() === 'array') {
      return this.custom((value: any[]) => {
        for (let element of value) {
          if (!Array.isArray(element))
            throw new ValidationError('array.of', { type });
        }

        return value;
      });
    } else {
      return this.custom((value: any[]) => {
        for (let element of value) {
          if (typeof element !== type)
            throw new ValidationError('array.of', { type });
        }
        return value;
      });
    }
  }
}

export const array = (options: Partial<ValidatorOptions> = {}) =>
  new ArrayValidator(options);
