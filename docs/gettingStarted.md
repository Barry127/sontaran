# Getting Started

The `object().schema()` function takes a schema of Sontaran validators as an argument.

In this example:

**username**

- Must be a string
- Cannot be only empty characters (spaces, tabs, return, ...)
- Must have a length between 3 and 10 characters
- Must match the given RegExp (only contain alphanumeric characters and dash, underscore)

**email**

- Must be a valid email

**password**

- Must be a string
- Must have a length of at least 8 characters

```javascript
import { object, string, email } from 'sontaran';

const schema = object().schema({
  username: string()
    .notEmpty()
    .between(3, 10)
    .match(/^[a-zA-Z0-9_\-]*$/),
  email: email(),
  password: string().min(8)
});

// Valid schema (return true)
schema.validate({
  username: 'sontaran',
  email: 'email@domain.com',
  password: 'mySuperSecretPassword'
}); /** => {
  valid: true,
  value: {
    username: 'sontaran',
    email: 'email@domain.com',
    password: 'mySuperSecretPassword
  }
}*/

// invalid usernames
let a = 123; // => not a string
let b = ' \t\r'; // => Empty characters
let c = 'aa'; // => too short
let d = 'Hello-World'; // => too long
let e = 'B@dInput'; // => invalid character
```

Sontarans `custom` can take any `ValidatorFunction` function as argument to validate and / or transform a value.

```javascript
import { string, ValidationError } from 'sontaran';

// value cannot be root and is transformed to lowercase
const myCustomValidator = (value) => {
  if (value.toLocaleLowercase() === 'root') {
    throw new ValidationError('root is not allowed');
  }

  return value.toLocaleLowercase();
};

const schema = string().custom(myCustomValidator);

// valid result transformed to lowercase
const result = schema.label('username').validate('Admin');
/* => {
  valid: true,
  value: 'admin'
}*/

// invalid result
const result = schema.label('username').validate('Root');
/* => {
  valid: false,
  value: 'Root',
  errors: [{
    field: 'username',
    message: 'root is not allowed',
    type: 'root is not allowed'
  }]
}
*/
```
