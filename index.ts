import { randomBytes } from 'crypto';

export function randomDigit() {
    while (true) {
        const randomNumber = randomBytes(1).readUInt8(0);

        // If the random number is 200 or bigger - disregard it and try another random byte
        // This is because we do '% 10' later on, which would be biassed otherwise
        // See explanation: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba
        // A random byte has 255 possible values, as long as we stick to 0 - 199 we can be sure
        // the distribution of possible last digits (which you get by % 10) is evenly spread
        if (randomNumber >= 200) {
            continue;
        }

        return randomNumber % 10;
    }
}

export function randomDigits(nr: number) {
    return [...Array(nr)].map(() => randomDigit());
}
