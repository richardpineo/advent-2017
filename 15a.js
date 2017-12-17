



/*jshint esversion: 6 */

let hexToBinary = require("hex-to-binary");

let generator = function(val, factor) {
    const Divisor = 2147483647;
    let newVal = (val * factor) % Divisor;
    return newVal;
};

let compareVals = function(a, b) {
    let aBin = a.toString(2);
    let bBin = b.toString(2);
    let aRight = aBin.substr(aBin.length-16);
    let bRight = bBin.substr(bBin.length-16);
    return aRight === bRight;
};

const Seeds = [
    {
        a: 65,
        b: 8921
    },
    {
        a: 116,
        b: 299
    }
];

const Factor = {
    a: 16807,
    b: 48271
};

Seeds.forEach((s) => {
    console.log(`Calculating seed value ${JSON.stringify(s)}.`);
    let count = 0;
    const consider = 40000000;
    let value = s;
    for( let i=0; i<consider; i++) {
        value.a = generator(value.a, Factor.a);
        value.b = generator(value.b, Factor.b);
        if( compareVals(value.a, value.b)) {
            count++;
        }
     }
     console.log(`The count for ${JSON.stringify(s)} is ${count}.`);
});
// 15a: 569
