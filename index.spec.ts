import { randomDigit, randomDigits } from './index';

function testRandomness(digits: number[]) {

    // Object to keep track of the test run
    const counters: { [key: number]: number } = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
    };

    // Populate counter
    digits.forEach(digit => counters[digit] += 1);

    // Calculate overall Chi Square to test the randomness
    // https://rpg.stackexchange.com/questions/70802/how-can-i-test-whether-a-die-is-fair
    const overallChiSquare: number = Object
        .values(counters)
        .map(count => {
            const countExpected = digits.length / 10;
            const chiSquare = (count - countExpected) * (count - countExpected) / countExpected;
            return chiSquare;
        })
        .reduce((a, b) => a + b);

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

    it('randomDigit function should provide randomDigits', () => {
        const digits = [...Array(1000 * 1000)].map(() => randomDigit());
        testRandomness(digits);
    });

    it('randomDigits function should provide randomDigits', () => {
        const digits = randomDigits(1000 * 1000).split('').map(digit => parseInt(digit));
        testRandomness(digits);
    });
});
