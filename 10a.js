/*jshint esversion: 6 */

let _ = require("lodash");

const input = "212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164";
const inputVals = input.split(",").map(x => parseInt(x));

let sequence = [];
for (let i = 0; i < 256; i++) {
    sequence[i] = i;
}

let normalize = function (x) {
    return x % 256;
};

let swap = function (a, b) {
    let t = sequence[a];
    sequence[a] = sequence[b];
    sequence[b] = t;
};

let reverseSection = function (start, stop) {
    let len = stop - start;
    let count = len / 2;
    for (let i = 0; i < count; i++) {
        swap(normalize(start + i), normalize(stop - i));
    }
};

let dump = function () {
    console.log(sequence.map((x, idx) => idx === position ? (`[${x}]`) : x).join(","));
};

let skipSize = 0;
let position = 0;

inputVals.forEach((v) => {
    // dump();
    reverseSection(position, position + v - 1);
    position = normalize(position + v + skipSize);
    skipSize++;
});

dump();
let answer = sequence[0] * sequence[1];
console.log(`The answer is ${answer}`);
// 212