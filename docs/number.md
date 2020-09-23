# Number

Sontarans NumberValidator extends the [BaseValidator](/any) and comes with validation methods for numbers.

```js
import { number, NumberValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = number(myValidatorOptions).min(3).validate(4);

const result2 = new NumberValidator(myValidatorOptions).min(3).validate(4);
```

## constructor

**number(options)**

Creates an `NumberValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = number(); // returns NumberValidator instance
```

## between

**number.between(min, max)**

Expect value to be between `min` and `max`. Both exclusive.

- `min` - `number` expect value to be greater than `min`.
- `max` - `number` expect value to be less than `max`.

```js
const schema = number().between(3, 5);
```

## greaterThan

**number.greaterThan(gt)**

Expect value to be greater than `gr`.

- `gt` - `number` value must be greater than `gt`.

```js
const schema = number().greaterThan(3);
```

## gt

**number.gt(gt)**

Same as [`greaterThan(gt)`](/number?id=greaterthan).

## isBigInt

**number.isBigint()**

Expect value to be a `BigInt`.

```js
const schema = number().isBigInt();
```

## isInt

**number.isInt()**

Expect value to be an integer value or `BigInt`.

```js
const schema = number().isInt();
```

## isInteger

**number.isInteger()**

Same as [`isInt()`](/number?id=isint).

## isNaN

**number.isNaN()**

Expect value te be `NaN`.

```js
const schema = number().isNaN();
```

## isNegative

**number.isNegative()**

Expect value to be negative (less than 0).

```js
const schema = number().isNegative();
```

## isPositive

**number.isPositive()**

Expect value to be positive (greater than 0).

```js
const schema = number().isPositive();
```

## lessThan

**number.lessThan(lt)**

Expect value to be less than `lt`.

- `lt` - `number` value must be less than `lt`.

```js
const schema = number().lessThan(5);
```

## lt

**number.lt(lt)**

Same as [`lessThan(lt)`](/number?id=lessthan).

## max

**number.max(max)**

Expect value to be at most `max` (inclusive).

- `max` - `number` maximum for value.

```js
const schema = number().max(17);
```

## min

**number.min(min)**

Expect value to be at least `min` (inclusive).

- `min` - `number` minimum for value.

```js
const schema = number().min(18);
```

## notNaN

**number.notNaN()**

Expect value to be a valid number (not `NaN`).

```js
const schema = number().notNaN();
```
