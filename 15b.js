/*jshint esversion: 6 */

let hexToBinary = require("hex-to-binary");

const Divisor = 2147483647;

let generator = function(val, factor, multipleOf) {
    let newVal = val;
    while(true) {
        newVal = (newVal * factor) % Divisor;
        if( 0 === ( newVal % multipleOf ) ) {
            return newVal;
        }
    }
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

const MultipleOf = {
    a: 4,
    b: 8
}

Seeds.forEach((s) => {
    console.log(`Calculating seed value ${JSON.stringify(s)}.`);
    let count = 0;
    const consider = 5000000;
    let value = s;
    for( let i=0; i<consider; i++) {
        value.a = generator(value.a, Factor.a, MultipleOf.a);
        value.b = generator(value.b, Factor.b, MultipleOf.b);
        if( compareVals(value.a, value.b)) {
            count++;
        }
     }
     console.log(`The count for ${JSON.stringify(s)} is ${count}.`);
});
// 298
