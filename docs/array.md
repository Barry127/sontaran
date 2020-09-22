# Array

Sontarans ArrayValidator extends the [BaseValidator](/any) and comes with validation methods for arrays.

```js
import { array, ArrayValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = array(myValidatorOptions).equals([1]).validate([1]);

const result2 = new ArrayValidator(myValidatorOptions)
  .equals([1])
  .validate([1]);
```

## constructor

**array(options)**

Creates an `ArrayValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = array(); // returns ArrayValidator instance
```

## between

**array.between(minLength, maxLength)**

Expect value array length to be between `minLength` and `maxLength`. Both inclusive.

- `minLength` - `number` minimum number of items in array.
- `maxLength` - `number` maximum number of items in array.

```js
const schema = array().between(3, 5);
```

## contains

**array.contains(expectedValue)**

Expect value array to contain `expectedValue`.

- `expectedValue` - value the array must contain.

```js
const schema = array().contains(42);
```

## each

**array.each(validator)**

Expect every value in array to pass `validator`.

- `validator` - Sontaran Validator for every value.

```js
const schema = array().each(number().min(18));
```

## includes

**array.includes(expectedValue)**

Same as [`contains(expectedValue)`](/array?id=contains).

## isSubsetOf

**array.isSubsetOf(superset)**

Expect value array to be a subset of `superset`.

- `superset` - `Array` of values of which the value is suppose to be a subset.

```js
const schema = array().isSubsetOf([1, 1, 2, 3, 5, 8, 13]);
```

## isSupersetOf

**array.isSupersetOf(subset)**

Expect value array to be a superset of `subset`.

- `subset` - `Array` of values of which the value is suppose to be a superset.

```js
const schema = array().isSupersetOf([2, 4, 6, 8]);
```

## length

**array.length(expectedLength)**

Expect value array length to be exactly `expectedLength`.

- `expectedLength` - `number` of items in value array.

```js
const schema = array().length(10);
```

## max

**array.max(maxLength)**

Expect value array length to be at most `maxLength`.

- `maxLength` - `number` maximum number of items in array.

```js
const schema = array().max(10);
```

## min

**array.min(minLength)**

Expect value array length to be at least `minLength`.

- `minLength` - `number` minimum number of items in array.

```js
const schema = array().min(5);
```

## of

**array.of(type)**

Expect all elements in value array to be of type `type`.

- `type` - type all elements in array must be. Possible values: `array` | `bigint` | `boolean` | `function` | `number` | `object` | `string`

```js
const schema = array().of('string');
```
