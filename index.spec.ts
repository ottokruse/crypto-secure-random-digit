import { randomDigit, randomDigits } from './index';

function testRandomness(digits: number[]) {

    // Object to keep track of the test run
    const counters: { [key: string]: number } = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
    };

    // Populate counter
    digits.forEach(digit => counters[digit.toString()] += 1);

    // Calculate overall Chi Square to test the randomness
    // https://rpg.stackexchange.com/questions/70802/how-can-i-test-whether-a-die-is-fair
    const overallChiSquare: number = Object
        .keys(counters)
        .map(digit => {
            const count = counters[digit];
            const countExpected = digits.length / 10;
            const chiSquare = (count - countExpected) * (count - countExpected) / countExpected;
            return chiSquare;
        })
        .reduce((a, b) => a + b);

    if (typeof overallChiSquare !== 'number') {
        throw new Error('overallChiSquare !== number');
    }
    // Throw an error if Chi Square is greater than the 90% threshold for 9 degrees of freedom
    // as per https://www.itl.nist.gov/div898/handbook/eda/section3/eda3674.htm
    const chiSquareThreshold = 14.684;
    if (overallChiSquare > chiSquareThreshold) {
        throw new Error(`SUSPICIOUS: Chi Square ${overallChiSquare} higher then threshold ${chiSquareThreshold} (n=${digits.length})`);
    } else {
        console.log(`SEEMS OKAY: Chi Square ${overallChiSquare} below threshold ${chiSquareThreshold} (n=${digits.length})`);
    }

}

describe('Test randomness of random generators', () => {

    // Each of these tests fail every 1 out of 10 times (10%) even if the digits are truly random
    // That is because we're comparing against the Chi square 90% threshold
    // There is no deterministic way to be sure that a dice truly is fair
    // If this test fails more often than 1 out of every 10 times, the digits probably aren't random

    it('randomDigit function should provide randomDigits', () => {
        const digits = [...Array(1000 * 1000)].map(() => randomDigit());
        testRandomness(digits);
    });

    it('randomDigits function should provide randomDigits', () => {
        const digits = randomDigits(1000 * 1000);
        testRandomness(digits);
    });
});
