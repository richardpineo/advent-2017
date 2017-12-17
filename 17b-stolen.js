/*jshint esversion: 6 */

// I gave up and stole this one from reddit. oh, the shame


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