import { randomBytes } from 'crypto';

let randomNumber: number; // defined at this scope to prevent any unnecessary GC when creating a lot of random digits

export function randomDigit() {
    while (true) {
        randomNumber = randomBytes(1).readUInt8(0);

        // If the random number is 250 or bigger - disregard it and try another random byte
        // This is because we do '% 10' later on, which would be biassed otherwise
        // A random byte has 256 possible values, as long as we stick to the first 250 (that is 0 - 249 inclusive)
        // we can be sure the distribution of possible last digits (which you get by % 10) is evenly spread
        // So 250, 251, 252, 253, 254 and 255 are skipped as they would make the distribution biassed towards 0, 1, 2, 3, 4 and 5.
        // See also: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba

        if (randomNumber < 250) {
            return randomNumber % 10;
        }
    }
}

export function randomDigits(nr: number) {
    return [...Array(nr)].map(() => randomDigit());
}
