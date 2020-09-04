import { BaseValidator, ValidatorFunction } from '../BaseValidator';

export class ArrayValidator extends BaseValidator {
  protected validators: ValidatorFunction<any[]>[] = [];

  constructor() {
    super();

    this.validators.push((value: any) => Array.isArray(value));
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
    this.validators.push((value: any[]) => value.includes(expectedValue));
    return this;
  }

  /** Expect every value in array to pass `validator` */
  each(validator: BaseValidator) {
    if (!(validator instanceof BaseValidator))
      throw new TypeError(
        'ArrayValidator each: validator must be a Sontaran validator'
      );

    this.validators.push(async (value: any[]) => {
      for (let element of value) {
        const result = await validator.validate({
          field: 'element',
          value: element
        });
        if (result !== null) return false;
      }

      return true;
    });
    return this;
  }

  /** Expect value array to (shallow) equal expectedValue */
  equals(expectedValue: any[]) {
    if (!Array.isArray(expectedValue))
      throw new TypeError(
        'ArrayValidator equals: exectedValue must by an array'
      );

    this.validators.push((value: any[]) => {
      if (value.length !== expectedValue.length) return false;

      for (let i = 0; i < value.length; i++) {
        if (value[i] !== expectedValue[i]) return false;
      }

      return true;
    });
    return this;
  }

  /** Expect value array to include `expectedValue` */
  includes(expectedValue: any) {
    return this.contains(expectedValue);
  }

  /** Expect value array to be a subset of `superset`  */
  isSubsetOf(superset: any[]) {
    if (!Array.isArray(superset))
      throw new TypeError('ArrayValidator equals: superset must by an array');

    this.validators.push((value: any[]) => {
      for (let element of value) {
        if (!superset.includes(element)) return false;
      }

      return true;
    });
    return this;
  }

  /** Expect value array to be a superset of `subset`  */
  isSupersetOf(subset: any[]) {
    if (!Array.isArray(subset))
      throw new TypeError('ArrayValidator equals: subset must by an array');

    this.validators.push((value: any[]) => {
      for (let element of subset) {
        if (!value.includes(element)) return false;
      }

      return true;
    });
    return this;
  }

  /** Expect value array to have exact length of `expectedLength` */
  length(expectedLength: number) {
    if (typeof expectedLength !== 'number')
      throw new TypeError(
        'ArrayValidator length: expectedlength must be a number'
      );

    this.validators.push((value: any[]) => value.length === expectedLength);
    return this;
  }

  /** Expect length of value array to be at most `maxLength` (inclusive) */
  max(maxLength: number) {
    if (typeof maxLength !== 'number')
      throw new TypeError('ArrayValidator max: maxlength must be a number');

    this.validators.push((value: any[]) => value.length <= maxLength);
    return this;
  }

  /** Expect length of value array to be at least `minLength` (inclusive) */
  min(minLength: number) {
    if (typeof minLength !== 'number')
      throw new TypeError('StringValidator min: minlength must be a number');

    this.validators.push((value: any[]) => value.length >= minLength);
    return this;
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
      this.validators.push((value: any[]) => {
        for (let element of value) {
          if (!Array.isArray(element)) return false;
        }

        return true;
      });
    } else {
      this.validators.push((value: any[]) => {
        for (let element of value) {
          if (typeof element !== type) return false;
        }

        return true;
      });
    }

    return this;
  }
}

export const array = () => new ArrayValidator();
