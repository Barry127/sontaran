# string

Sontarans StringValidator extends the [BaseValidator](/any) and comes with validation methods for strings.

```js
import { string, StringValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = string(myValidatorOptions)
  .startsWith('H')
  .validate('Hello World!');

const result2 = new StringValidator(myValidatorOptions)
  .startsWith('H')
  .validate('Hello World!');
```

## constructor

**string(options)**

Creates an `StringValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = string(); // returns StringValidator instance
```

## ascii

**string.ascii()**

Expect value to only contain ascii characters.

```js
const schema = string().ascii();
```

## base64

**string.base64()**

Expect value to be a valid base64 encoded string.

```js
const schema = string().base64();
```

## between

**string.between(min, max)**

Expect value length to be between `min` and `max`. Both inclusive.

- `min` - `number` expect value length to be at least `min`.
- `max` - `number` expect value length to be at most `max`.

```js
const schema = number().between(3, 5);
```

## contains

**string.contains(expectedValue)**

Expect value to contain `expectedValue`.

- `expectedValue` - `string` value the string must contain.

```js
const schema = string().contains('World');
```

## empty

**string.empty()**

Expect value to be empty (only spaces, tabs, new lines).

```js
const schema = string().empty();
```

## endsWith

**string.endsWith(expectedEnd)**

Expect value to end with `expectedEnd`.

- `expectedEnd` - `string` the value must end with.

```js
const schema = string().endsWith('!');
```

## equalsCaseInsensitive

**string.equalsCaseInsensitive(expectedValue)**

Expect value to equal `expectedValue`. Comparison is done case insensitive.

- `expectedValue` - `string` value must equal (case insensitive).

```js
const schema = string().equalsCaseInsensitive('HELLO WORLD!');
```

## extendedAscii

**string.extendedAscii()**

Expect value to only contain extended ascii characters.

```js
const schema = string().extendedAscii();
```

## hexColor

**string.hexColor()**

Expect value to be a valid hex color.

```js
const schema = string().hexColor();
```

## includes

**string.includes(expectedValue)**

Same as [`contains(expectedValue)`](/string?id=contains).

## isJson

**string.isJson()**

Expect value te be valid JSON.

!> This validator uses `JSON.parse()` under the hood, so be careful with large values!

```js
const schema = string().isJson();
```

## length

**string.length(expectedLength)**

Expect value length to be exactly `expectedLength`.

- `expectedLength` - `number` length of value.

```js
const schema = string().length(10);
```

## lowercase

**string.lowercase()**

Expect value te be in all lowercase.

```js
const schema = string().lowercase();
```

## match

**string.match(pattern)**

Expect value to match `RegExp` `pattern`.

- `pattern` - `RegExp` value must match.

```js
const schema = string().match(/[a-zA-Z]/);
```

## max

**string.max(maxLength)**

Expect value length to be at most `maxLength`.

- `maxLength` - `number` maximum length for value.

```js
const schema = string().max(10);
```

## min

**string.min(minLength)**

Expect value length to be at least `minLength`.

- `minLength` - `number` minimum length for value.

```js
const schema = string().min(5);
```

## notEmpty

**string.notEmpty()**

Expect value not to be empty (only spaces, tabs, new lines).

```js
const schema = string().notEmpty();
```

## startsWith

**string.startsWith(expectedStart)**

Expect value to start with `expectedStart`.

- `expectedStart` - `string` the value must start with.

```js
const schema = string().startsWith('!');
```

## uppercase

**string.uppercase()**

Expect value te be in all uppercase.

```js
const schema = string().uppercase();
```
