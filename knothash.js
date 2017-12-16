/*jshint esversion: 6 */
let _ = require("lodash");

var compute = function (input) {
    const lengths = input.split("").map(c => c.charCodeAt(0));
    lengths.push(17, 31, 73, 47, 23);
    // console.log(`${inputVals.join(",")}`);

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

    for (let i = 0; i < 64; i++) {
        lengths.forEach((v) => {
            // dump();
            reverseSection(position, position + v - 1);
            position = normalize(position + v + skipSize);
            skipSize++;
        });
    }

    // dump();

    let densify = function (chunk) {
        return chunk.reduce((x, v, i) => {
            if (i) {
                return x ^ v;
            }
            return x;
        }, chunk[0]);
    };

    // let test = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
    // console.log(`test = ${densify(test)}`);

    let dense = [];
    for (let block = 0; block < 16; block++) {
        let chunk = sequence.splice(0, 16);
        let densed = densify(chunk);
        dense.push(densed);
    }

    // https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    function decimalToHex(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }

    let code = dense.reduce((s, v) => {
        return s + decimalToHex(v);
    }, "");

    // console.log(`Hashed ${code} for input ${input}`);
    return code;
};

module.exports = {
    compute: compute
};