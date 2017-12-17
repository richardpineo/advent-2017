/*jshint esversion: 6 */

// I gave up and stole this one from reddit. oh, the shame
// https://www.reddit.com/r/adventofcode/comments/7kc0xw/2017_day_17_solutions/

// The eureka moment of this is that becuase we are pulling 
// from the value after 0, we only need to track what is 
// inserted at position 1. I didn't figure this out and tried
// to brute force the whole thing like an idgit.

let steps = 304;
let count = 5000000;

let pos = 0, value = 0;
for (let i = 1; i <= count; i++) {
    pos = ((pos + steps) % i) + 1;
    if (pos === 1) {
        value = i;
    }
}

console.log(value);

// 1930815