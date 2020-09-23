# Email

Sontarans EmailValidator extends the [StringValidator](/string) and comes with validation methods for emails.

```js
import { email, EmailValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = email(myValidatorOptions).validate('info@email.com');

const result2 = new EmailValidator(myValidatorOptions).validate(
  'info@email.com'
);
```

## constructor

**email(options)**

Creates an `EmailValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = email(); // returns EmailValidator instance
```

## domain

**email.domain(expectedDomain)**

Expect email domain to be or match `expectedDomain`.

- `expectedDomain` - `string` that domain must match or `RegExp` that domain must match.

```js
const schema = email().domain('gmail.com');
```

## domainBlacklist

**email.domainBlacklist(blacklist)**

Email domain cannot be a domain in `blacklist`. Useful for banning temporary email services.

- `blacklist` - `Array` of string containing blacklisted domains.

!> Sontaran exports a huge list of temporary email services called `badEmailDomains`. To avoid large bundle sizes it's not recommended to use `badEmailDomains` on the client side.

```js
import { email, badEmailDomains } from 'sontaran';

const schema = email().domainBlacklist(badEmailDomains);
```

## localPart

**email.localPart(expectedName)**

Same as [`name(expectedName)`](/email?id=name).

## name

**email.name(expectedName)**

Expect local part (name) of email to be or match `expectedName`.

- `expectedName` - `string` that local part must match or `RegExp` that local part must match.

```js
const schema = email().name('info');
```

## tld

**email.tld(tlds)**

Expect email to have top level domain in `tlds`.

- `tlds` - `string` containing top level domain email must have or `Array` of strings containing multiple top level domains of which email must match one.

```js
const schema = email().tld(['.com', '.org']);
```

## tldBlacklist

**email.tldBlacklist(tlds)**

Expect email not to have top level domain in `tlds`.

- `tlds` - `string` containing top level domain email must not have or `Array` of strings containing multiple top level domains of which email must match none.

```js
const schema = email().tldBlacklist(['.biz', '.xxx']);
```
