type AsyncValidatorFunction<T = any> = (value: T) => Promise<boolean>;
type SyncValidatorFunction<T = any> = (value: T) => boolean;

export type ValidatorFunction<T = any> =
  | AsyncValidatorFunction<T>
  | SyncValidatorFunction<T>;

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationField {
  field: string;
  value: any;
}

export abstract class BaseValidator {
  protected validators: ValidatorFunction[] = [];
  protected message = 'Validation error';
  protected value!: any;

  /** Set custom error message */
  withMessage(message: string) {
    this.message = message;
    return this;
  }

  /** add custom validator */
  custom(validator: ValidatorFunction) {
    this.validators.push(validator);
    return this;
  }

  /** validate a value against validator */
  async validate({
    field,
    value
  }: ValidationField): Promise<ValidationError | null> {
    this.value = value;

    for (const validator of this.validators) {
      const result = await validator(this.value);
      if (!result) {
        return { field, message: this.message };
      }
    }

    return null;
  }
}
