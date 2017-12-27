/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var particlesRaw = fs.readFileSync('./data/20-input.txt').toString().split("\n");
console.log(`${particlesRaw.length} particles read`);

const regex = /p=<([-\d]+),([-\d]+),([-\d]+)>, v=<([-\d]+),([-\d]+),([-\d]+)>, a=<([-\d]+),([-\d]+),([-\d]+)>/;
let particles = particlesRaw.map((p, idx) => {
    let m = regex.exec(p);
    if (m.length !== 10) {
        throw ("nope");
    }
    return {
        id: idx,
        p: {
            x: parseInt(m[1]),
            y: parseInt(m[2]),
            z: parseInt(m[3])
        },
        v: {
            x: parseInt(m[4]),
            y: parseInt(m[5]),
            z: parseInt(m[6])
        },
        a: {
            x: parseInt(m[7]),
            y: parseInt(m[8]),
            z: parseInt(m[9])
        },
        distance: function () {
            return Math.abs(this.p.x) + Math.abs(this.p.y) + Math.abs(this.p.z);
        },
        sameLoc: function (p) {
            return this.p.x === p.p.x && this.p.y === p.p.y && this.p.z === p.p.z;
        },
        active: true
    };
});

// particles.forEach(p => console.log(JSON.stringify(p)));
let activeParticles = () => particles.filter(p => p.active);

let tick = () => {
    activeParticles().forEach(p => {
        p.v.x += p.a.x;
        p.v.y += p.a.y;
        p.v.z += p.a.z;
        p.p.x += p.v.x;
        p.p.y += p.v.y;
        p.p.z += p.v.z;
    });
};

let destroy = () => {
    let toDestroy = [];
    let active = activeParticles();
    active.forEach((p) => {
        let same = active.filter(p2 => p2.id != p.id && p2.sameLoc(p));
        let targets = same.map(p3 => p3.id);
        Array.prototype.push.apply(toDestroy, targets);
    });
    if (toDestroy.length) {
        toDestroy = _.uniq(toDestroy);
        console.log(`Destroying ${toDestroy.length}: ${JSON.stringify(toDestroy)}`);
        toDestroy.forEach(d => {
            active.find(p => p.id === d).active = false;
        });
    }
    return toDestroy;
};

const NumSteps = 100000;
let log = [];
let last = null;
for (let i = 0; i < NumSteps; i++) {
    tick();
    let destroyed = destroy();
    if (destroyed.length) {
        last = {
            index: i,
            destroyed: destroyed
        };
        log.push(last);
    }
    if(last && last.index < i - 50 ) {
        break;
    }
}

console.log(`${activeParticles().length} particles remain after ${last.index} moves`);
// 420  (!!)