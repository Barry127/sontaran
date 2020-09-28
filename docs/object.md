# Object

Sontarans ObjectValidator extends the [BaseValidator](/any) and comes with validation methods for objects.

```js
import { object, ObjectValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = object(myValidatorOptions)
  .equals({ foo: 'bar' })
  .validate({ foo: 'bar' });

const result2 = new ObjectValidator(myValidatorOptions)
  .equals({ foo: 'bar' })
  .validate({ foo: 'bar' });
```

## constructor

**object(options)**

Creates an `ObjectValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = object(); // returns ObjectValidator instance
```

## contains

**object.contains(expectedValue)**

Expect value object to contain an own property with the value `expectedValue`.

- `expectedValue` - value at least one own property of value object must contain.

```js
const schema = object().contains(42);
```

## hasKey

**object.hasKey(key)**

Same as [`hasOwnProperty(key)`](/object?id=hasownproperty).

## hasOwnProperty

**object.hasOwnProperty(key)**

Expect value object to have own property `key`.

- `key` - `string` name of property value object must contain.

```js
const schema = object().hasOwnProperty('role');
```

## includes

**object.includes(expectedValue)**

Same as [`contains(expectedValue)`](/object?id=contains).

## isSubsetOf

**object.isSubsetOf(superset)**

Expect value object to be a subset of `superset`.

- `superset` - `Object` of which the value is suppose to be a subset.

```js
const schema = object().isSubsetOf({ foo: 'bar', id: 42 });
```

## isSupersetOf

**object.isSupersetOf(subset)**

Expect value object to be a superset of `subset`.

- `subset` - `Object` of which the value is suppose to be a superset.

```js
const schema = object().isSupersetOf({ role: 'user' });
```

## length

**object.length(expectedLength)**

Expect value object length of own properties to be exactly `expectedLength`.

- `expectedLength` - `number` of own properties in value object.

```js
const schema = object().length(10);
```

## max

**object.max(maxLength)**

Expect value object length of own properties to be at most `maxLength`.

- `maxLength` - `number` maximum number of own properties in object.

```js
const schema = object().max(10);
```

## min

**object.min(minLength)**

Expect value object length of own properties to be at least `minLength`.

- `minLength` - `number` minimum number of own properties in object.

```js
const schema = object().min(5);
```

## schema

**object.schema(schema)**

Validate object strictly according to `schema` of Sontaran validators.

- `schema` - Schema of sontaran validators.

```js
const schema = object().schema({
  username: string()
    .between(3, 10)
    .match(/^[a-zA-Z0-9_\-]*$/),
  email: email(),
  password: string().min(8)
});
```
