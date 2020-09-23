# Network

Sontarans NetworkValidator extends the [StringValidator](/string) and comes with validation methods for networks.

```js
import { network, NetworkValidator } from 'sontaran';

const myValidatorOptions = {};

// both results are the same
const result1 = network(myValidatorOptions).ipv4().validate('127.0.0.1');

const result2 = new NetworkValidator(myValidatorOptions)ipv4()..validate(
  '127.0.0.1'
);
```

## constructor

**network(options)**

Creates a `NetworkValidator` instance.

- `options` - [validator options](/types?id=validatoroptions) or part of validator options.

```js
const schema = network(); // returns NetworkValidator instance
```

## ip

**network.ip()**

Expect value to be a valid IP (v4 or v6) address.

```js
const schema = network().ip();
```

## ipv4

**network.ipv4()**

Expect value to be a valid IPv4 address.

```js
const schema = network().ipv4();
```

## ipv6

**network.ipv6()**

Expect value to be a valid IPv6 address.

```js
const schema = network().ipv6();
```

## mac

**network.mac()**

Expect value to be a valid MAC address.

```js
const schema = network().mac();
```

## tld

**network.tld(tlds)**

Expect value (url) to have top level domain in `tlds`.

- `tlds` - `string` containing top level domain value must have or `Array` of strings containing multiple top level domains of which value must match one.

```js
const schema = network().tld(['.com', '.org']);
```

## tldBlacklist

**network.tldBlacklist(tlds)**

Expect value (url) not to have top level domain in `tlds`.

- `tlds` - `string` containing top level domain value must not have or `Array` of strings containing multiple top level domains of which value must match none.

```js
const schema = network().tldBlacklist(['.biz', '.xxx']);
```

## url

**network.url()**

Expect value to be a valid URL.

```js
const schema = network().url();
```
