import { BaseValidator, ValidatorOptions } from '../BaseValidator';
import { ValidationError } from '../errors/ValidationError';

export class BooleanValidator extends BaseValidator<boolean> {
  constructor(options: Partial<ValidatorOptions> = {}) {
    super(options);

    this.custom((value: any) => {
      if (typeof value !== 'boolean')
        throw new ValidationError('boolean.boolean');

      return value;
    });
  }

  /** Expect value to be false */
  false() {
    return this.custom((value: boolean) => {
      if (value !== false) throw new ValidationError('boolean.false');

      return value;
    });
  }

  /** Expect value to be true */
  true() {
    return this.custom((value: boolean) => {
      if (value !== true) throw new ValidationError('boolean.true');

      return value;
    });
  }
}

export const boolean = (options: Partial<ValidatorOptions> = {}) =>
  new BooleanValidator(options);
export const bool = boolean;
