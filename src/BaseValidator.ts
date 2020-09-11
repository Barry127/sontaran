import {
  ValidatorFunction,
  ValidatorOptions,
  ValidationResult,
  LocaleDef
} from './types';
import { ValidationError } from './errors/ValidationError';

import en from '../locales/en.json';

type DefaultValue<T> = T | (() => T);

export abstract class BaseValidator<T = any> {
  /** Wether there are any async validators */
  protected async: boolean = false;

  /** Options for validator */
  protected options: ValidatorOptions = {
    abortEarly: true,
    locale: en
  };

  /** List of all validator functions */
  private validators: ValidatorFunction<T>[] = [];

  /** internal state */

  private whitelistValues: T[] = [];
  private defaultValue?: DefaultValue<T>;
  private _label: string = 'unnamed field';

  constructor(options: Partial<ValidatorOptions> = {}) {
    this.options = {
      ...this.options,
      ...options
    };

    this.custom((value: T) => {
      if (value === undefined && this.defaultValue !== undefined) {
        return typeof this.defaultValue === 'function'
          ? (this.defaultValue as () => T)()
          : this.defaultValue;
      }
      return value;
    });
  }

  /** Allow values even if not allowed in list */
  allow(...values: T[]) {
    return this.whitelist(...values);
  }

  /** Disallow values */
  blacklist(...values: T[]) {
    this.custom((value: T) => {
      if (values.includes(value))
        throw new ValidationError('base.blacklist', { value: value as any });
      return value;
    });
    return this;
  }

  /** add custom validator */
  custom(validator: ValidatorFunction<T>) {
    this.validators.push(validator);
    return this;
  }

  /** Set default value when value is undefined */
  default(defaultValue: DefaultValue<T>) {
    this.defaultValue = defaultValue;
    return this;
  }

  /** Disallow values */
  disallow(...values: T[]) {
    return this.blacklist(...values);
  }

  /** Expect value to equal one of `expectedValues` */
  enum(expectedValues: T[]) {
    if (!Array.isArray(expectedValues))
      throw new TypeError(
        'Sontaran BaseValidator.enum: exectedValues must by an array'
      );

    this.custom((value: any) => {
      if (!expectedValues.includes(value))
        throw new ValidationError('base.enum', {
          value,
          enum: expectedValues.toString()
        });

      return value;
    });
    return this;
  }

  /** Expect value to equal `expectedValue` */
  equals(expectedValue: T) {
    this.custom((value: any) => {
      if (value !== expectedValue)
        throw new ValidationError('base.equals', {
          value,
          expectedValue: expectedValue as any
        });

      return value;
    });
    return this;
  }

  /** Extend current locale with extra locale defs */
  extendLocale(locale: LocaleDef) {
    this.options.locale = {
      ...this.options.locale,
      ...locale
    };
    return this;
  }

  /** Mark field as forbidden in object */
  forbidden() {
    this.validators.unshift((value: any) => {
      if (value !== undefined) throw new ValidationError('base.forbidden');

      return value;
    });
    return this;
  }

  /** Set label (field) name */
  label(name: string) {
    this._label = name;
    return this;
  }

  /** Expect value to equal one of `expectedValues` */
  oneOf(expectedValues: T[]) {
    return this.enum(expectedValues);
  }

  /** validate a value */
  validate(value: any): ValidationResult<T> {
    if (this._isWhitelist(value)) return { value, valid: true };

    if (this.async)
      throw new Error(
        'Sontaran BaseValidator.validate cannot be used with async validator functions. Use validateAsync instead.'
      );

    let result: ValidationResult<T> = {
      valid: true,
      value
    };

    const errors: ValidationResult<T>['errors'] = [];

    for (const validator of this.validators) {
      try {
        const validatorResult = validator(value);

        if (validatorResult instanceof Promise)
          throw new Error(
            'Sontaran BaseValidator.validate cannot be used with async validator functions. Use validateAsync instead.'
          );

        result.value = validatorResult;
      } catch (err) {
        if (err instanceof ValidationError) {
          result.valid = false;
          errors.push({
            field: this._label,
            message: err.format(this._label, this.options.locale),
            type: err.message
          });
        } else {
          throw err;
        }

        if (this.options.abortEarly) break;
      }
    }

    return result.valid
      ? result
      : {
          ...result,
          errors
        };
  }

  /** validate a value async */
  async validateAsync(value: any): Promise<ValidationResult<T>> {
    if (this._isWhitelist(value)) return { value, valid: true };

    let result: ValidationResult<T> = {
      valid: true,
      value
    };

    const errors: ValidationResult<T>['errors'] = [];

    for (const validator of this.validators) {
      try {
        result.value = await validator(value);
      } catch (err) {
        if (err instanceof ValidationError) {
          result.valid = false;
          errors.push({
            field: this._label,
            message: err.format(this._label, this.options.locale),
            type: err.message
          });
        } else {
          throw err;
        }

        if (this.options.abortEarly) break;
      }
    }

    return result.valid
      ? result
      : {
          ...result,
          errors
        };
  }

  /** Allow values even if not allowed in list */
  whitelist(...values: T[]) {
    this.whitelistValues = this.whitelistValues.concat(values);
    return this;
  }

  private _isWhitelist(value: any) {
    return this.whitelistValues.includes(value);
  }
}
