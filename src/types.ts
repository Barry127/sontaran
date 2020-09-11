/** Validator functions */
export type AsyncValidatorFunction<T = any> = (value: T) => Promise<T>;
export type SyncValidatorFunction<T = any> = (value: T) => T;

export type ValidatorFunction<T = any> =
  | AsyncValidatorFunction<T>
  | SyncValidatorFunction<T>;

/** Validator */
export interface ValidatorOptions {
  /** Abort validating when on first error
   *
   * @default true
   */
  abortEarly: boolean;

  /** Locale definitions
   *
   * @default en locale defs
   */
  locale: LocaleDef;
}

export interface LocaleDef {
  [key: string]: string;
}

export interface ValidationValidResult<T = any> {
  valid: boolean;
  value: T;
  errors?: undefined;
}

export interface ValidationErrorResult {
  valid: boolean;
  value: any;
  errors: ValidationError[];
}

export type ValidationResult<T> =
  | ValidationValidResult<T>
  | ValidationErrorResult;

export interface ValidationError {
  field: string;
  message: string;
  type: string;
}
