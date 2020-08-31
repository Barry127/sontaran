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

  withMessage(message: string) {
    this.message = message;
    return this;
  }

  custom(validator: ValidatorFunction) {
    this.validators.push(validator);
    return this;
  }

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
