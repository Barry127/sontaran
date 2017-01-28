# Sontaran

[![Code Climate](https://codeclimate.com/github/Barry127/sontaran/badges/gpa.svg)](https://codeclimate.com/github/Barry127/sontaran)
[![Test Coverage](https://codeclimate.com/github/Barry127/sontaran/badges/coverage.svg)](https://codeclimate.com/github/Barry127/sontaran/coverage)

Sontaran is javascript validator with a fluid syntax. It has taken inspiration from great validators like [joi](https://github.com/hapijs/joi) and [validator.js](https://github.com/chriso/validator.js).

Sontarans primary focus is to offer an easy-to-use, flexible and readable validator for Node.js.

Sontaran comes with the folling validators:

* Array
* Boolean
* Email
* Network
* Number
* Object
* RegExp
* String

## Example

Complete docs can be found [here](https://barry127.github.io/sontaran/).

```javascript
const { validate } = require('sontaran');
let user = {
  // Some user object to validate
};

let userValidator = validate(user).object().keys({
  username: (v) => v.string().between(3, 12).required(),
  password: (v) => v.string().min(8).required(),
  email: (v) => v.email().noThrowAway().required(),
  age: (v) => v.number().integer().min(18).required(),
  bio: (v) => v.string()
});

if (!userValidator.valid()) {
  // Log an array of errors if validator is invalid
  console.log(userValidator.errors());
}
```

## Installation

Sontaran can be installed using npm.

```bash
npm install --save sontaran
```

After installation Sontaran can be included to your project.

```javascript
// ES5 syntax
var validate = require('sontaran').validate;

// ES6 syntax
const { validate } = require('sontaran');
```
