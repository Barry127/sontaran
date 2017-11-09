# Sontaran

[![Code Climate](https://codeclimate.com/github/Barry127/sontaran/badges/gpa.svg)](https://codeclimate.com/github/Barry127/sontaran)
[![Test Coverage](https://codeclimate.com/github/Barry127/sontaran/badges/coverage.svg)](https://codeclimate.com/github/Barry127/sontaran/coverage)

Sontaran is a javascript validator library. It comes with validation functions for:

* Array
* Boolean
* Email
* Network
* Number
* Object
* String

Sontaran takes a functional aproach in validations. All validators are composable to create useful validators.

> Sontaran uses recent ES features. It is tested on stable Node and should run out of the box in evergreen browsers. If you need to support legacy browsers consider using a transpiler with polyfills.

## Installation

Sontaran can be installed using npm.

```bash
npm install --save sontaran
```

For the complete code including all tests the repo can be cloned.

```bash
git clone https://github.com/Barry127/sontaran.git
cd sontaran
npm run test
```

## Getting Started

The `sontaran/validator` function composes the sontaran validators to a single validator function. The validators are run in order, if one returns false the following functions will not be run.

In this example the username:

* Must be a string
* Cannot be only empty characters (spaces, tabs, return, ...)
* Must have a length between 3 and 10 characters
* Must match the given RegExp (only contain alphanum characters and dash, underscore)

```javascript
const validator = require('sontaran/validator');

const isString = require('sontaran/string/isString');
const notEmpty = require('sontaran/string/notEmpty');
const between = require('sontaran/string/between');
const match = require('sontaran/string/match');

const validateUsername = validator(
  isString(),
  notEmpty(),
  between(3, 10),
  match(/^[a-zA-Z0-9_\-]*$/)
);

// Valid usernames (return true)
validateUsername('Barry127');
validateUsername('DoctorWho');
validateUsername('JohnDoe');
validateUsername('-_hi_-');

// invalid usernames (return false)
validateUsername(123); // => not a string
validateUsername(' \t\r'); => Empty characters
validateUsername('aa'); => too short
validateUsername('Hello-World'); // too long
validateUsername('B@dInput'); // invalid character
```

`sontaran/validator` can take any function as argument that takes the value to validate as argument and returns a boolean as result.

```javascript
const validator = require('sontaran/validator');

const isEmail = require('sontaran/email/isEmail');
const noThrowAway = require('sontaran/email/noThrowAway');

// this validator is quite useless in this example
// but for demonstration purpose it will serve just fine
const myCustomValidator = value => value.indexOf('@') > -1;

const validateEmail = validator(
  isEmail(),
  myCustomValidator,
  noThrowAway()
);

// valid emails (return true)
validateEmail('me@you.com');
validateEmail('info@my.sub.domain.co.uk');
validateEmail('email@domain.tld');

// invalid emails (return false)
validateEmail('hi'); // => not an email
validateEmail('www.google.com'); // => not an email
validateEmail('me@yopmail.com'); // => throw away email not allowed
```

Again we compose some validators using the `sontaran/validate` function.

In this example the email:

* Must be a valid email address
* Must contain an @ sign (our custom validator)
* Cannot be an email address from a throw away email service

# Docs

## validator

`validator([functions])`

validator is the heart of Sontaran. It combines all (validation) functions it gets as an argument and combines them to one validator.

### Arguments

|                           |                                      |
|-------------------------: |------------------------------------- |
| **[functions]** Function  | The validator functions to combine to one validation function |

### Returns

|                 |                                      |
|---------------: |------------------------------------- |
| **Function**    | A validator function that combines all validators given as arguments |

### Example

```javascript
const validator = require('sontaran/validator');
const isNumber = require('sontaran/number/isNumber');
const isInteger = require('sontaran/number/isInteger');
const min = require('sontaran/number/min');

const ageValidator = validator(
  isNumber(),
  isInteger(),
  min(18)
);

ageValidator(21);
// => true

ageValidator(18);
// => true


ageValidator('21');
// => false

ageValidator(33.33);
// => false
```

> More docs can be found [here](https://barry127.github.io/sontaran/).

## Function List

* array
  * between
  * contains
  * each
  * equals
  * isArray
  * isSubset
  * isSuperset
  * length
  * max
  * min
  * of
* boolean
  * equals
  * isBoolean
  * isFalse
  * isTrue
* email
  * domain
  * isEmail
  * localPart => name
  * name
  * noThrowAway
* network
  * ip
  * ipv4
  * ipv6
  * mac
* number
  * between
  * equals
  * greaterThan
  * gt => greaterThan
  * isInt => isInteger
  * isInteger
  * isNaN
  * isNegative
  * isNumber
  * isPositive
  * lessThan
  * lt => lessThan
  * max
  * min
  * notNaN
* object
  * contains
  * equals
  * hasKey => hasOwnProperty
  * hasKeys => hasOwnProperties
  * hasOwnProperty
  * hasOwnProperties
  * isObject
  * isSubset
  * isSuperset
  * length
  * max
  * min
* string
  * ascii
  * base64
  * between
  * contains
  * empty
  * endsWith
  * enum => oneOf
  * equals
  * extendedAscii
  * hexColor
  * isJson
  * isString
  * length
  * lowercase
  * match
  * max
  * min
  * notEmpty
  * startsWith
  * uppercase
