# Sontaran

[![Code Climate](https://codeclimate.com/github/Barry127/sontaran/badges/gpa.svg)](https://codeclimate.com/github/Barry127/sontaran)
[![Test Coverage](https://codeclimate.com/github/Barry127/sontaran/badges/coverage.svg)](https://codeclimate.com/github/Barry127/sontaran/coverage)

Sontaran is a javascript validator utility library. It comes with validation functions for:

* Array
* Boolean
* Email
* Network
* Number
* Object
* String

## Installation

Sontaran can be installed using npm.

```bash
npm install --save sontaran
```

Loading Sontaran:

```javascript
// Load the full library
var sontaran = require('sontaran');

// Load a validator category
var array = require('sontaran/array');
var number = require('sontaran/number');

// Load specific methods for smaller bundles
var domain = require('sontaran/email/domain');
var noThrowAway = require('sontaran/email/noThrowAway');
```

## Example

Complete docs can be found [here](https://barry127.github.io/sontaran/).

Every sontaran validator function returns a new validator function that can be chained using `sontaran/validator`

```javascript
const validator = require('sontaran/validator');
const { isString, notEmpty, min, max, match } = require('sontaran/string');
const { isEmail, noThrowAway } = require('sontaran/email');

const usernameValidator = validator(
  isString(),
  notEmpty(),
  min(3),
  max(10),
  match(/^[a-zA-Z0-9_\-]*$/)
);

const emailValidator = validator(
  isEmail(),
  noThrowAway()
);

const formData = {
  // some formdata
};

if (!usernameValidator(formData.username)) {
  // => invalid username
}
if (!emailValidator(formData.email)) {
  // => invalid email
}

// email is valid
```

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
