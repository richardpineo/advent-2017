/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var rulesRaw = fs.readFileSync('./data/21-input.txt').toString().split("\n");
console.log(`${rulesRaw.length} rules read`);

const regex2x2 = /([#.])([#.])\/([#.])([#.]) => ([#.])([#.])([#.])\/([#.])([#.])([#.])\/([#.])([#.])([#.])/;
const regex3x3 = /([#.])([#.])([#.])\/([#.])([#.])([#.])\/([#.])([#.])([#.]) => ([#.])([#.])([#.])([#.])\/([#.])([#.])([#.])([#.])\/([#.])([#.])([#.])([#.])\/([#.])([#.])([#.])([#.])/;

const On = "#";
const Off = ".";

let rules = rulesRaw.map(r => {
    let m2x2 = regex2x2.exec(r);
    let m3x3 = regex3x3.exec(r);
    if (m2x2 && m2x2.length === 14) {
        let rawIn = m2x2.slice(1, 5).map(i => i === On ? 1 : 0);
        let rawOut = m2x2.slice(5, 14).map(i => i === On ? 1 : 0)
        return {
            type: 2,
            input: [rawIn[0], rawIn[1], rawIn[2], rawIn[3]],
            output: [[rawOut[0], rawOut[1], rawOut[2], rawOut[3], rawOut[4], rawOut[5], rawOut[6], rawOut[7], rawOut[8]]]
        };
    }
    else if (m3x3 && m3x3.length === 26) {
        let rawIn = m3x3.slice(1, 10).map(i => i === On ? 1 : 0);
        let rawOut = m3x3.slice(10, 26).map(i => i === On ? 1 : 0);
        return {
            type: 3,
            input: [rawIn[0], rawIn[1], rawIn[2], rawIn[3], rawIn[4], rawIn[5], rawIn[6], rawIn[7], rawIn[8]],
            // #..#/..../..../#..#
            // #.  .#
            // ..  ..
            // ..  ..
            // #.  .#
            output: [
                [rawOut[0], rawOut[1], rawOut[4], rawOut[5]],
                [rawOut[2], rawOut[3], rawOut[6], rawOut[7]],
                [rawOut[8], rawOut[9], rawOut[12], rawOut[13]],
                [rawOut[10], rawOut[11], rawOut[14], rawOut[15]]
            ]
        };
    }
    else {
        throw ("Nope");
    }
});
rules.forEach(r => console.log(JSON.stringify(r)));

const rules2 = rules.filter(r => r.type === 2);
const rules3 = rules.filter(r => r.type === 3);

let grid = [[0, 1, 0, 0, 0, 1, 1, 1, 1]];

let gridType = function () {
    return Math.sqrt(grid[0].length);
};

let rot = (s) => {
    if (s.length === 4) {
        return [s[3], s[0], s[4], s[1]];
    }
    else {
        return [s[3], s[0], s[1], s[6], s[4], s[2], s[7], s[8], s[5]];
    }
};
let flip = (s, h) => {
    if (s.length === 4) {
        return [s[0], s[3], s[2], s[4]];
    }
    else {
        if (h) {
            return [s[2], s[1], s[0], s[5], s[4], s[3], s[8], s[7], s[6]];
        } else {
            return [s[6], s[7], s[8], s[3], s[4], s[5], s[0], s[1], s[2]];
        }
    }
};

let match2 = function (r, s) {
    // original, rot, rot, rot, flip, rot, rot, rot
    let source = [s, flip(s)];
    let tries = [];
    source.forEach(source => {
        for (let i = 0; i < 4; i++) {
            tries.push(source);
            source = rot(source);
        }
    });
    return tries.reduce((match, t) => {
        return match || t.reduce((m, v, idx) => {
            return m || v === r.input[idx];
        }, false);
    }, false);
};

let match3 = function (r, s) {
    if (r.input[4] !== s[4]) {
        return false;
    }
    let source = [s, flip(s, true), flip(s, false)];
    let tries = [];
    source.forEach(source => {
        for (let i = 0; i < 8; i++) {
            tries.push(source);
            source = rot(source);
        }
    });
    return tries.reduce((match, t) => {
        return match || t.reduce((m, v, idx) => {
            return m || v === r.input[idx];
        }, false);
    }, false);
};

let processSquare = function (type, square) {
    let found;
    if (type === 2) {
        found = rules2.find(r => match2(r, square));
    } else {
        found = rules3.find(r => match3(r, square));
    }
    if (!found) {
        throw ("nope");
    }
    return found.output;
};

let transformGrid = function () {
    let newGrid = [];
    grid.forEach(square => {
        let output = processSquare(gridType(), square);
        Array.prototype.push.apply(newGrid, output);
    });
    return newGrid;
};

let countOn = function () {
    return grid.reduce((count, v) => {
        return count + v.reduce((gridCount, gv) => {
            return gridCount + gv;
        }, 0);
    }, 0);
};

let dump = (id) => {
    console.log(`${id}: Type ${gridType()}: ${JSON.stringify(grid)}`);
    console.log(`${id}: Total pixels on: ${countOn()}`);
}

const numIter = 5;
for (let iter = 0; iter < numIter; iter++) {
    grid = transformGrid();
    dump(iter);
}
dump("FINAL");


