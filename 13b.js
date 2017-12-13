/*jshint esversion: 6 */

var fs = require('fs');
var steps = fs.readFileSync('./data/13-input.txt').toString().split("\n");
console.log(`${steps.length} steps read`);

const regex = /^(\d+): (\d+)$/;

const MaxSlot = 84;

let scanners = steps.map((s) => {
    let result = regex.exec(s);
    if(result.length !== 3) {
        throw("nope");
    }

    return {
        slot: parseInt(result[1]),
        range: parseInt(result[2])
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

let wasDetected = function(slot) {
    let scanner = scanners.find(s => s.slot == slot);
    return scanner && !scanner.position;
};

let wasCaught = function(delay) {
    scanners.forEach(s=> {
        s.position = 0;
        s.increasing = true;
    });

    for(let i=0; i<delay; i++) {
        moveScanners();        
    }

    let severity = 0;
    for(let slot = 0; slot<=MaxSlot; slot++ ) {
        if(wasDetected(slot)) {
            return true;
        }
        moveScanners();
    }
    return false;
};

for(let delay=0; delay<10000; delay++) {
    if(!wasCaught(delay)) {
        console.log(`Found the path! Delay ${delay} for a good time.`);
        return;
    }
}
console.log(`D'oh! Busted.`);

// 2264