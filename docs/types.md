# Types

## ValidatorFunction

A ValidatorFunction takes the value to be validated as argument and returns the value. The value can be transformed. If validation fails the ValidatorFunctions needs to throw a `ValidationError`.

ValidatorsFunctions can be async. When one or more are async the Validator needs to use the `validateAsync` method.

```ts
type AsyncValidatorFunction<T = any> = (value: T) => Promise<T>;
type SyncValidatorFunction<T = any> = (value: T) => T;

type ValidatorFunction<T = any> =
  | AsyncValidatorFunction<T>
  | SyncValidatorFunction<T>;
```

## ValidatorOptions

Validators can have ValidatorOptions.

```ts
interface ValidatorOptions {
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

interface LocaleDef {
  [key: string]: string;
}
```

## ValidationResult

When a schema is validated the `.validate` method returns a ValidationResult.

- Valid indicates if the validation was successful (`true`) or failed (`false)
- Value is the current (transformed) value
- Errors contains an array of ValidationErrors when the validation failed

```ts
interface ValidationResult<T> {
  valid: boolean;
  value: T;
  errors?: ValidationErrorType[];
}
```

## ValidationErrorType

when a validation fails the ValidationErrorType indicates what validation fails.

- Field is the name of the schema field that failed or the field name set with the `.label` method
- Message is the full message taken from the LocaleDef or value for type if no def is found
- Type key for the LocaleDef e.g. number.min

```ts
interface ValidationErrorType {
  field: string;
  message: string;
  type: string;
}
```
