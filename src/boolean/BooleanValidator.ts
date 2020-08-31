import { BaseValidator, ValidatorFunction } from '../BaseValidator';

export class BooleanValidator extends BaseValidator {
  protected validators: ValidatorFunction<boolean>[] = [];

  constructor() {
    super();

    this.validators.push((value: any) => typeof value === 'boolean');
  }

  /** Expect value to equal `expectedValue` */
  equal(expectedValue: boolean) {
    this.validators.push((value: boolean) => value === expectedValue);
    return this;
  }

  /** Expect value to be false */
  false() {
    this.validators.push((value: boolean) => value === false);
    return this;
  }

  /** Expect value to be true */
  true() {
    this.validators.push((value: boolean) => value === true);
    return this;
  }
}

export const boolean = () => new BooleanValidator();
export const bool = boolean;
