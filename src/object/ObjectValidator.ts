import { BaseValidator } from '../BaseValidator';
import { ValidatorOptions } from '../types';
import { ValidationError } from '../errors/ValidationError';

export class ObjectValidator extends BaseValidator<object> {
  constructor(options: Partial<ValidatorOptions> = {}) {
    super(options);

    this.custom((value: any) => {
      if (value === null || typeof value !== 'object')
        throw new ValidationError('object.object');

      return value;
    });
  }

  /** Expect value object to contain own property with value `expectedValue` */
  contains(expectedValue: any) {
    return this.custom((value: object) => {
      if (!Object.values(value).includes(expectedValue))
        throw new ValidationError('object.contains', {
          expectedValue: `${expectedValue}`
        });
      return value;
    });
  }

  /** Expect value object to (shallow) equal expectedValue */
  equals(expectedValue: object) {
    if (typeof expectedValue !== 'object')
      throw new TypeError(
        'ObjectValidator.equals: exectedValue must be an object'
      );

    return this.custom((value: {}) => {
      const valueEntries = Object.entries(value);
      const expectedEntries = Object.entries(expectedValue);

      if (valueEntries.length !== expectedEntries.length)
        throw new ValidationError('object.equals', {
          expectedValue: objectToString(expectedValue)
        });

      for (let [key, value] of valueEntries) {
        if ((expectedValue as any)[key] !== value)
          throw new ValidationError('object.equals', {
            expectedValue: objectToString(expectedValue)
          });
      }

      return value;
    });
  }

  /** Expect value object to have ownproperty `key` */
  hasKey(key: string) {
    return this.hasOwnProperty(key);
  }

  /** Expect value object to have ownproperty `key` */
  hasOwnProperty(key: string) {
    if (typeof key !== 'string')
      throw new TypeError(
        'ObjectValidator.hasOwnProperty: key must be a string'
      );

    return this.custom((value: object) => {
      if (!Object.prototype.hasOwnProperty.call(value, key))
        throw new ValidationError('object.hasownproperty', { key });
      return value;
    });
  }

  /** Expect value object to contain own property with value `expectedValue` */
  includes(expectedValue: any) {
    return this.contains(expectedValue);
  }

  /** Expect value object to be a subset of `superset`  */
  isSubsetOf(superset: object) {
    if (typeof superset !== 'object')
      throw new TypeError(
        'ObjectValidator.isSubsetOf: superset must be an object'
      );

    return this.custom((value: object) => {
      for (let [key, itemValue] of Object.entries(value)) {
        if ((superset as any)[key] !== itemValue)
          throw new ValidationError('object.subset', {
            superset: objectToString(superset)
          });
      }
      return value;
    });
  }

  /** Expect value object to be a superset of `subset`  */
  isSupersetOf(subset: object) {
    if (typeof subset !== 'object')
      throw new TypeError(
        'ObjectValidator.isSuperOf: subset must be an object'
      );

    return this.custom((value: object) => {
      for (let [key, itemValue] of Object.entries(subset)) {
        if ((value as any)[key] !== itemValue)
          throw new ValidationError('object.superset', {
            subset: objectToString(subset)
          });
      }
      return value;
    });
  }

  /** Expect value object to have exact length of own properties of `expectedLength` */
  length(expectedLength: number) {
    if (typeof expectedLength !== 'number')
      throw new TypeError(
        'ObjectValidator.length: expectedlength must be a number'
      );

    return this.custom((value: object) => {
      if (Object.keys(value).length !== expectedLength)
        throw new ValidationError('object.length', {
          expectedLength: `${expectedLength}`
        });
      return value;
    });
  }

  /** Expect length of own properties of value object to be at most `maxLength` (inclusive) */
  max(maxLength: number) {
    if (typeof maxLength !== 'number')
      throw new TypeError('ObjectValidator.max: maxlength must be a number');

    return this.custom((value: object) => {
      if (Object.keys(value).length <= maxLength) return value;
      throw new ValidationError('object.max', {
        maxLength: `${maxLength}`
      });
    });
  }

  /** Expect length of own properties value object to be at least `minLength` (inclusive) */
  min(minLength: number) {
    if (typeof minLength !== 'number')
      throw new TypeError('ObjectValidator.min: minlength must be a number');

    return this.custom((value: object) => {
      if (Object.keys(value).length >= minLength) return value;
      throw new ValidationError('object.min', {
        minLength: `${minLength}`
      });
    });
  }
}

export const object = (options: Partial<ValidatorOptions> = {}) =>
  new ObjectValidator(options);

function objectToString(object: object): string {
  const entries = Object.entries(object);
  return `{${entries
    .map(([key, value]) => {
      return `${key}:${value}`;
    })
    .join(',')}}`;
}
