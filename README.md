# Cryptographically Secure Pseudo-Random Number Generator

This is a node package for generating cryptographically secure random digits.

If you think "why don't you just use crypto.randomBytes?" read this: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba

I wrote this module because I wanted something simple without any dependencies and, more importantly, with an implementation I can understand.

Usage:

```js
const digitGenerator = require('crypto-secure-random-digit');

const randomDigit = digitGenerator.randomDigit(); // Returns a random number, e.g. 7

const randomDigits = digitGenerator.randomDigits(10); // Return a string with 10 random digits, e.g. '0954765043'
```
