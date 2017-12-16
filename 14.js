/*jshint esversion: 6 */
/*jshint loopfunc: true */

let knothash = require("./knothash");
let hexToBinary = require("hex-to-binary");

let generate = function (key, numRows) {
    let data = [];
    for (let i = 0; i < (numRows || 128); i++) {
        let input = `${key}-${i.toString()}`;
        let hashed = knothash.compute(input);
        let binary = hexToBinary(hashed);
        let bits = binary.split("").map((b) => parseInt(b));
        let used = bits.reduce((count, b) => count + b, 0);
        data.push({
            input: input,
            hashed: hashed,
            binary: binary,
            bits: bits,
            used: used
        });
    }
    return data;
};

let countUsed = data => {
    let count = data.reduce((v, d) => v + d.used, 0);
    return count;
};

let countRegions = data => {
    return 0;
};

let keys = [
    "flqrgnkx",
    "hfdlxzhv"
];

keys.forEach(key => {
    let data = generate(key);
    console.log(`${countUsed(data)} squares used for key ${key}`)
    console.log(`${countRegions(data)} regions contained in key ${key}`)
});
// 14a: 8230
