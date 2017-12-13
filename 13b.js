/*jshint esversion: 6 */

var fs = require('fs');
var steps = fs.readFileSync('./data/13-input.txt').toString().split("\n");
console.log(`${steps.length} steps read`);
let _ = require("lodash");

const regex = /^(\d+): (\d+)$/;

const MaxSlot = 84;

let moveScanners = function (scans) {
    scans.forEach((s) => {
        if (s.increasing) {
            if (s.position === s.range - 1) {
                s.position--;
                s.increasing = false;
            }
            else {
                s.position++;
            }
        }
        else {
            if (s.position === 0) {
                s.position++;
                s.increasing = true;
            }
            else {
                s.position--;
            }
        }
    });
};

let wasDetected = function (scans, slot) {
    let scanner = scans.find(s => s.slot == slot);
    return scanner && !scanner.position;
};

let delay = 0;

let scanners = steps.map((s) => {
    let result = regex.exec(s);
    if (result.length !== 3) {
        throw ("nope");
    }

    return {
        slot: parseInt(result[1]),
        range: parseInt(result[2]),
        position: 0,
        increasing: true
    };
});

let wasCaught = function (scans) {
    for (let slot = 0; slot <= MaxSlot; slot++) {
        if (wasDetected(scans, slot)) {
            return slot;
        }
        moveScanners(scans);
    }
    return -1;
};

// Yep, this is inefficient as poo.
let bestSlot = 0;
console.log('Searching for a safe path. This will take a while...');
for (; delay < 9999999; delay++) {
    let caughtAt = wasCaught(_.cloneDeep(scanners));
    if (caughtAt === -1) {
        console.log(`\nFound the path! Delay ${delay} for a good time.`);
        return;
    }
    if (caughtAt > bestSlot) {
        bestSlot = caughtAt;
        console.log(`\nBest so far! Detected after ${delay} delay at slot ${caughtAt}`);
    }
    moveScanners(scanners);
    if ((delay % 10000) === 0) {
        process.stdout.write(".");
    }
}
console.log("");
console.log(`D'oh! Busted.`);

// 3875838