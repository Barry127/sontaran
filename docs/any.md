# Any

Any is the Sontarans base validator. All Validators extend from the same base validator.

```js
import { any, Sontaran } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = any(myValidatorOptions).equals(true).validate(true);

const result2 = new Sontaran(myValidatorOptions).equals(true).validate(true);
```

## constructor

**any(options)**

Creates a `Sontaran` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = any(); // returns Sontaran instance
```

## allow

**any.allow(...values)**

Same as [`whitelist(...values)`](/any?id=whitelist).

## blacklist

**any.blacklist(...values)**

Set values that are always invalid.

- `values` - blacklisted values that are always invalid.

```js
const schema = any().blacklist('a', 'b', 'c'); // a, b, c are invalid
const numberSchema = number().min(10).blacklist(11); // numbers 10 and greater are valid except 11
```

## custom

**any.custom(validator)**

Add a custom validator function.

- `validator` - custom [`ValidatorFunction`](/types?id=ValidatorFunction) which returns value or throws a `ValidationError` when value is invalid.

```js
import { any, ValidationError } from 'sontaran';

const validator = (value) => {
  // Throw an error when value is 1
  if (value === 1) throw new ValidationError('error.type');

  // Transform value to 0 when value is less than 0
  if (value < 0) return 0;

  // Return current value
  return value;
};

const schema = any().custom(validator);
```

## default

**any.default(defaultValue)**

Set default value when value to validate is `undefined`.

- `defaultValue` - literal default value or function returning default value.

```js
const schema = object().schema({
  username: string(),
  email: email(),
  createdAt: any().default(Date.now),
  _v: number().default(1)
});
```

## disallow

**any.disallow(...values)**

Same as [`blacklist(...values)`](/any?id=blacklist).

## enum

**any.enum(expectedValues)**

Value is only valid if it (shallow) equals one of expectedValues.

- `expectedValues` - Array of all possible valid values.

```js
const schema = any().enum(['1st', '2nd', '3rd']); // all values other than 1st, 2nd and 3rd are invalid
```

## equals

**any.equals(expectedValue)**

Expect value to equal `expectedValue`.

- `expectedValue` - Value tested value must equal to.

```js
const schema any().equals(42); // all values other than 42 are invalid
```

## extendLocale

**any.extendLocale(locale)**

Extend current locale setting with `locale`. Useful for custom error messages.

- `locale` - a key / value dictionary to extend locale defs.

```js
import { object, number, ValidationError } from 'sontaran';

const locale = {
  'custom.even': '{{label}} must be even'
};

const evenValidator = (value) => {
  if (value % 2 !== 0) throw new ValidationError('custom.even');
  return value;
};

const schema = object().schema({
  a: number().custom(evenValidator)
});

schema.validate({ a: 3 });
/* => {
  valid: false,
  value: {
    a: 3
  },
  errors: [{
    field: 'a',
    message: 'a must be even',
    type: 'custom.even'
  }]
}*/
```

## forbidden

**any.forbidden()**

Mark field as forbidden in object.

```js
const schema = object().schema({
  username: string(),
  hasAdminPrivileges: any().forbidden()
}); // Object can not have field `hasAdminPrivileges`
```

## label

**any.label(name)**

- `label` - `string` set label (name / key) for current field.

```js
const schema = object().schema({
  fullName: string().label('Full Name')
});
```

## oneOf

**any.oneOf(expectedValues)**

Same as [`enum(expectedValues)`](/any?id=enum).

## optional

**any.optional()**

All fields in a schema are required. When set to optional the field is no longer required and can be `undefined`.

```js
const schema = object().schema({
  name: string(),
  age: number().optional()
});
```

## validate

**any.validate(value)**

Validate `value` with current schema.

- `value` - Value to be validated

returns a [`ValidationResult`](/types?id=ValidationResult).

```js
const schema = object().schema({
  age: number().min(18)
});

schema.validate({ age: 20 });
/* => {
  valid: true,
  value: { age: 20 }
}*/

schema.validate({ age: 17 });
/* => {
  valid: false,
  value: { age: 17 },
  errors: [{
    field: 'age',
    message: 'age cannot be less than 18',
    type: 'number.min'
  }]
}*/
```

## validateAsync(value)

**any.validate(value)**

Validate `value` async with current schema.

- `value` - Value to be validated

returns a [`ValidationResult`](/types?id=ValidationResult).

```js
const schema = object().schema({
  age: number().min(18)
});

await schema.validateAsync({ age: 20 });
/* resolves to => {
  valid: true,
  value: { age: 20 }
}*/

await schema.validateAsync({ age: 17 });
/* resolves to => {
  valid: false,
  value: { age: 17 },
  errors: [{
    field: 'age',
    message: 'age cannot be less than 18',
    type: 'number.min'
  }]
}*/
```

## whitelist

**any.whitelist(...values)**

Allows values even if values are invalid according to validator.

- `values` - whitelisted values that are always valid.

```js
const schema = any().whitelist('a', 'b', 'c'); // a, b, c are always valid
const numberSchema = number().min(10).whitelist(0); // numbers 10 and greater and 0 are valid.
```
