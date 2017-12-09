let banks = "0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11";

let _ = require("lodash");

let history = [];

function balance(orig) {
    let array = orig.slice();
    let index = _.indexOf(array, _.max(array));
    let val = array[index];
    array[index] = 0;
    for( ; val > 0; val-- ) {
        index++;
        if( index >= array.length ) {
            index = 0;
        }
        array[index] += 1;
    }
//    console.log(`balanced: sum = ${_.sum(array)}`)
    return array;
}

let current = banks.split("\t").map(v => parseInt(v));
while(true) {
    let balanced = balance(current);
    let sig = balanced.join(',');
    if( history.find(x => x === sig) !== undefined) {
        break;
    }
    history.push(sig);
    current = balanced;
}

let balanced = balance(current);
let sig = balanced.join(',');
let index = history.findIndex(v => v === sig);
let cycle = history.length - index;
console.log(`cycle size is ${cycle}`);
// 1695