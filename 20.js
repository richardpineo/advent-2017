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
        distance: function() {
            return Math.abs(this.p.x) + Math.abs(this.p.y) + Math.abs(this.p.z);
        }
    };
});

// particles.forEach(p => console.log(JSON.stringify(p)));

let tick = () => {
    particles.forEach(p => {
        p.v.x += p.a.x;
        p.v.y += p.a.y;
        p.v.z += p.a.z;
        p.p.x += p.v.x;
        p.p.y += p.v.y;
        p.p.z += p.v.z;
    });
};

const NumSteps = 100000;
for(let i=0; i<NumSteps; i++) {
    tick();
}
let closestParticle = _.minBy(particles, p => p.distance());

console.log(`Closest particle is ${closestParticle.id}`);
console.log(`${JSON.stringify(closestParticle)}`);
// 364  DUH