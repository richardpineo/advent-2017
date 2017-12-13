/*jshint esversion: 6 */

var fs = require('fs');
var steps = fs.readFileSync('./data/13-input.txt').toString().split("\n");
console.log(`${steps.length} steps read`);

const regex = /^(\d+): (\d+)$/;

let scanners = steps.map((s) => {
    let result = regex.exec(s);
    if(result.length !== 3) {
        throw("nope");
    }

    return {
        slot: parseInt(result[1]),
        range: parseInt(result[2]),
        position: 0,
        increasing: true
    };
});

let moveScanners = function() {
    scanners.forEach((s) => {
        if( s.increasing ) {
            if( s.position === s.range - 1) {
                s.position--;
                s.increasing = false;
            } 
            else {
                s.position++;
            }
        }
        else {
            if( s.position === 0 ) {
                s.position++;
                s.increasing = true;
            } 
            else {
                s.position--;
            }
        }
    });
};

let detectionDamage = function(slot) {
    let scanner = scanners.find(s => s.slot == slot);
    if( !scanner || scanner.position ) {
        return 0;
    }
    let damage = scanner.range * slot;
    console.log(`Caught! Location (${slot}) damage (${damage})`);
    return damage;
};

const MaxSlot = 84;
let severity = 0;
for(let slot = 0; slot<=MaxSlot; slot++ ) {
    severity += detectionDamage(slot);
    moveScanners();
}

console.log(`severity is ${severity}`);
// 2264