var fs = require('fs');
var array = fs.readFileSync('7-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

const regex = /(\w+) \((\d+)\)( -> ([a-z, ]+)+)?/;

let objs = array.map((v) => {
    let result = regex.exec(v);
    // group 1 = name
    // group 2 = weight
    // group 4 = carries (may not exist, format is csv 'name, name, ..'
    let carries;
    if( result[4]) {
        carries = result[4].split(",").map(s => s.replace(" ", ""));
    }
    return {
        name: result[1],
        weight: parseInt(result[2]),
        carries: carries
    }
});

let findName = function(name) {
    return objs.find(o => o.name === name);
}

function getWeight(object) {
    let above = 0;
    if( object.carries ) {
        above = object.carries.reduce((sum, o) => {
            return sum + getWeight(findName(o));
        }, 0);
    }
    return object.weight + above;
}

function isBalanced(considerName) {
    let found = findName(considerName);
    if( !found.carries ) {
        return true;
    }

    if( found.carries ) {
        found.carries.forEach(c => {
            if(!isBalanced(c)) {
                return false;
            }
        })
        let aboveWeights = found.carries.map((name) => {
            let o = findName(name);
            return { 
                name: o.name, 
                localWeight: o.weight,
                weight: getWeight(o) 
            }
         });
        let same = !!aboveWeights.every( v => v.weight === aboveWeights[0].weight )
        if(!same) {
            console.log(`${found.name} not balanced. sub-weights are:`);
            aboveWeights.forEach( (w) => {
                console.log(`${JSON.stringify(w)}`);
            })
            return false; 
        }
    }

    return true;
}

// start with hmvwl, the base and do a depth first to find the unbalanced.
let bal = isBalanced( 'hmvwl' );

// 1859 - 6 = 1853