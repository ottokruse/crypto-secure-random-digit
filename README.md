# NOTICE

Since NodeJS v14.10.0, v12.19.0 there is [crypto.randomInt()](https://nodejs.org/api/crypto.html#crypto_crypto_randomint_min_max_callback), you probably wanna use that.

(It actually has a [similar implementation](https://github.com/nodejs/node/blob/80785f6ec965dbcfba5b8c263befc373bd08b525/lib/internal/crypto/random.js#L201))

## Cryptographically Secure Pseudo-Random Number Generator

![Master Build Status](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiZ2p2VmorN1dQcCs1a0duMjh5QnlUOHczdTUyZ3Y2cjB1ei93c2oxS2lkaXg2NzVGdUErMEpuRWU4SWxrcUtIZTZlK1dXTCtndW5oTUhmZHRCTTBDdVFFPSIsIml2UGFyYW1ldGVyU3BlYyI6IlgwK2pwckV3bG9HWHVnUEciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

This is a node package for generating cryptographically secure random digits.

If you think "why do you need more than just `crypto.randomBytes`?" read this: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba

I wrote this module because I wanted something simple without any dependencies and with an implementation I can understand - and thus verify.

Usage:

```js
const digitGenerator = require('crypto-secure-random-digit');

// Get one random digit
const randomDigit = digitGenerator.randomDigit();
console.log(randomDigit); // e.g. 4

// Get a list with 10 random digits:
const randomDigits = digitGenerator.randomDigits(10);
console.log(randomDigits); // e.g. [7, 1, 0, 0, 5, 9, 3, 8, 2, 7]
```
