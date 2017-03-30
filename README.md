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

```javascript
const { email } = require('sontaran/email');

function myEmailValidator (userEmail) {
  if (!email.isEmail(userEmail)) {
    throw Error(userEmail + ' is not a valid email address');
  }

  if (!email.noThrowAway(userEmail)) {
    throw Error('Throw away email accounts are not accepted');
  }

  // This is probably the worst email check ever
  if (email.domain(userEmail, /gmail/i)) {
    throw Error('Gmail accounts are not accepted');
  }

  return userEmail;
}

const formData = {
  // some formdata
};

try {
  myEmailValidator(formData.email);
} catch (e) {
  // handle error
}

// email is valid
```

## Function List

* array
  * between
  * contains
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
  * isInteger
  * isNaN
  * isNegative
  * isNumber
  * isPositive
  * lessThan
  * max
  * min
  * notNaN
* object
  * contains
  * equals
  * hasKey
  * hasKeys
  * hasOwnProperty
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
  * enum
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
