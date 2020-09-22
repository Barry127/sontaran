# Boolean

Sontarans BooleanValidator extends the [BaseValidator](/any) and comes with validation methods for booleans.

```js
import { bool, boolean, BooleanValidator } from 'sontaran';

const myValidatorOptions = {};

// all results are the same
const result1 = bool(myValidatorOptions).equals(true).validate(true);
const result2 = boolean(myValidatorOptions).equals(true).validate(true);

const result3 = new BooleanValidator(myValidatorOptions)
  .equals(true)
  .validate(true);
```

## constructor

**boolean(options)**

Creates an `BooleanValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = boolean(); // returns BooleanValidator instance
```

## false

**boolean.false()**

Expect value to be `false`.

```js
const schema = boolean().false();
```

## true

**boolean.true()**

Expect value to be `true`.

```js
const schema = boolean().true();
```
