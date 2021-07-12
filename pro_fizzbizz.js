let i = 0
let j = 0
let limit = 101
//prints zero
console.log(`${i}`);

while (i < limit) {
    i = i + 5;

    (i - 4 <= limit) ? (i - 4) % 3 === 0 ? console.log(`${i - 4}${Array(limit.toString().length - (i - 4).toString().length + 1).fill('\xa0').join('')}- Fizz`) : console.log(`${i - 4}`) : "";
    (i - 3 <= limit) ? (i - 3) % 3 === 0 ? console.log(`${i - 3}${Array(limit.toString().length - (i - 3).toString().length + 1).fill('\xa0').join('')}- Fizz`) : console.log(`${i - 3}`) : "";
    (i - 2 <= limit) ? (i - 2) % 3 === 0 ? console.log(`${i - 2}${Array(limit.toString().length - (i - 2).toString().length + 1).fill('\xa0').join('')}- Fizz`) : console.log(`${i - 2}`) : "";
    (i - 1 <= limit) ? (i - 1) % 3 === 0 ? console.log(`${i - 1}${Array(limit.toString().length - (i - 1).toString().length + 1).fill('\xa0').join('')}- Fizz`) : console.log(`${i - 1}`) : "";

    i <= limit ? i % 3 === 0 ? console.log(`${i}${Array(limit.toString().length - i.toString().length + 1).fill('\xa0').join('')}- FizzBuzz`) : console.log(`${i}${Array(limit.toString().length - i.toString().length + 1).fill('\xa0').join('')}- Buzz`) : "";

    j++ //Loop Counter

}

console.log(`${j} iterations ran to print the logic for ${limit} numbers`)