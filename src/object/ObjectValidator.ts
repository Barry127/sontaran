import { BaseValidator } from '../BaseValidator';
import { ValidatorOptions, Schema, ValidationErrorType } from '../types';
import { ValidationError } from '../errors/ValidationError';

export class ObjectValidator extends BaseValidator<object> {
  private _schema?: Schema;

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

  /** Validate object by schema of Sontaran Validators */
  schema(schema: Schema) {
    const validators = Object.values(schema);
    for (let validator of validators) {
      if (!(validator instanceof BaseValidator))
        throw new TypeError(
          'ObjectValidator.entries: schema must be a schema of Sontaran Validators'
        );
    }

    this._schema = schema;
    return this;
  }

  validate(value: any) {
    if (!this._schema) return super.validate(value);

    const baseResult = super.validate(value);
    if (!baseResult.valid && this.options.abortEarly) return baseResult;

    const schemeEntries = Object.entries(this._schema);
    const errors: ValidationErrorType[] = [];

    for (let [key, validator] of schemeEntries) {
      const label = getLabel(validator, key);

      // check for required fields
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        const err = new ValidationError('base.required');
        if (isRequired(validator))
          errors.push({
            field: label,
            message: err.format(label, this.options.locale),
            type: err.message
          });
        continue;
      }

      // handle validator
      const result = validator.validate(value[key]);
      if (!result.valid) errors.push(...result.errors!);
    }

    // handle non expected fields
    const invalidFields = Object.keys(value).filter(
      (key) => !Object.keys(this._schema!).includes(key)
    );

    for (let invalidField of invalidFields) {
      const err = new ValidationError('object.notinschema');
      errors.push({
        field: invalidField,
        message: err.format(invalidField, this.options.locale),
        type: err.message
      });
    }

    return errors.length === 0 ? baseResult : { valid: false, value, errors };
  }

  async validateAsync(value: any) {
    if (!this._schema) return super.validateAsync(value);

    const baseResult = await super.validateAsync(value);
    if (!baseResult.valid && this.options.abortEarly) return baseResult;

    const schemeEntries = Object.entries(this._schema);
    const errors: ValidationErrorType[] = [];

    for (let [key, validator] of schemeEntries) {
      const label = getLabel(validator, key);

      // check for required fields
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        const err = new ValidationError('base.required');
        if (isRequired(validator))
          errors.push({
            field: label,
            message: err.format(label, this.options.locale),
            type: err.message
          });
        continue;
      }

      // handle validator
      const result = await validator.validateAsync(value[key]);
      if (!result.valid) errors.push(...result.errors!);
    }

    // handle non expected fields
    const invalidFields = Object.keys(value).filter(
      (key) => !Object.keys(this._schema!).includes(key)
    );

    for (let invalidField of invalidFields) {
      const err = new ValidationError('object.notinschema');
      errors.push({
        field: invalidField,
        message: err.format(invalidField, this.options.locale),
        type: err.message
      });
    }

    return errors.length === 0 ? baseResult : { valid: false, value, errors };
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

function isRequired(validator: any): boolean {
  return validator._required !== false;
}

function getLabel(validator: any, key: string): string {
  if (validator._label === 'unnamed field') validator.label(key);

  return validator._label as string;
}
