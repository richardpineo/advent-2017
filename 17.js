/*jshint esversion: 6 */

let _ = require("lodash");

let list;
let currentPosition;
let init = function () {
    list = { next: null, data: 0 };
    currentPosition = 0;
};

let dump = function () {
    let index = 0;
    for (let cur = list; cur; cur = cur.next) {
        process.stdout.write(index === currentPosition ? `(${cur.data}) ` : `${cur.data} `);
        index++;
    }
};

let nodeAtOrLast = function (pos) {
    let cur = list;
    for (let index = 0; index < pos; index++) {
        if (cur.next === null) {
            return cur;
        }
        cur = cur.next;
    }
    return cur;
};

let listLength = function () {
    let index = 0;
    for (let cur = list; cur; cur = cur.next, index++);
    return index;
};

let step = function (value, stepSize) {
    currentPosition = (currentPosition + stepSize) % listLength() + 1;
    let node = nodeAtOrLast(currentPosition);
    let newVal = { next: node.next, data: value };
    node.next = newVal;
};

const tests = [
    { input: 3, count: 2017, find: 2017 },
    { input: 304, count: 2017, find: 2017 },
    { input: 304, count: 5000000, find: 0 }
];

let valueAfter = function (findVal) {
    let cur = list;
    while (cur.data !== findVal) {
        cur = cur.next;
    }
    return cur.next.data;
};

console.log("Warning: This run can take up to an hour or more");

tests.forEach(t => {
    console.log(`Starting evaluation of ${JSON.stringify(t)}`);

    init();

    let startTime = Date.now();
    let blockTime = startTime;
    let dotsAt = 10000;
    let timeAt = 100000;
    let numBlocks = 0;
    for (let i = 1; i <= t.count; i++) {
        step(i, t.input);

        if ((i % dotsAt) === 0) {
            process.stdout.write(".");
        }

        if ((i % timeAt) === 0) {
            let now = Date.now();
            let elapsed = (now - blockTime) / 1000;
            let elapsedTotal = (now - startTime) / 1000;
            numBlocks++;
            console.log(`  ${i} values in ${Math.round(elapsed)}s, ${Math.round(elapsedTotal)}s total, average ${Math.round(elapsedTotal / numBlocks)}s`);
            blockTime = Date.now();
        }
    }

    console.log(`${JSON.stringify(t)} gives value ${valueAfter(t.find)}`);
});

// 1173