/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var stream = fs.readFileSync('./data/9-input.txt').toString();
console.log(`Read file, ${stream.length} characters found`);

let garbageCount = 0;
let cleanStream = function (s) {
    let garbage = false;
    let correct = false;
    let chars = s.split("");
    return chars.reduce((clean, c) => {
        if (garbage) {
            if (correct) {
                correct = false;
                return clean;
            }
            if (c === '!') {
                correct = true;
                return clean;
            }

            if (c === '>') {
                garbage = false;
                return clean;
            }
            garbageCount++;
            return clean;
        }
        if (c === '<') {
            garbage = true;
            return clean;
        }
        if (c === '}' || c === "{") {
            return clean + c;
        }
        return clean;
    }, "");
};

let cs = cleanStream(stream);
//console.log(cs);
console.log(`garbage count is ${garbageCount}`);
// 4482
