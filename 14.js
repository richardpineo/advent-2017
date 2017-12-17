/*jshint esversion: 6 */
/*jshint loopfunc: true */

let knothash = require("./knothash");
let hexToBinary = require("hex-to-binary");

const NumRows = 128;
const NumBits = 128;

let generate = function (key) {
    let data = [];
    for (let i = 0; i < NumRows; i++) {
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
            used: used,
            regionIndices: bits.map(b => undefined)
        });
    }
    return data;
};

let countUsed = data => {
    let count = data.reduce((v, d) => v + d.used, 0);
    return count;
};

let countRegions = data => {
    let regions = [];

    let sameLoc = function (a, b) {
        return a.index === b.index && a.row === b.row;
    };

    // Returns index, use -1 for regionIndex to add
    let assign = function (loc, regionIndex) {
        if (regionIndex !== undefined) {
            regions[regionIndex].push(loc);
        }
        else {
            regionIndex = regions.push([loc]) - 1;
        }
        data[loc.row].regionIndices[loc.index] = regionIndex;
        return regionIndex;
    };

    // undefined if not found
    let findRegionIndex = function (loc) {
        let found;
        regions.forEach((region, index) => {
            region.forEach(regionLoc => {
                if (sameLoc(regionLoc, loc)) {
                    found = index;
                }
            });
        });
        return found;
    };

    // figure it out based on neighboring squares up and left
    // -1 if no neighbors found
    let calculateByNeighbors = function (loc) {
        let above = { row: loc.row - 1, index: loc.index };
        let left = { row: loc.row, index: loc.index - 1 };
        if (left.index < 0) {
            left.index = NumBits - 1;
        }

        let aboveIndex = findRegionIndex(above);
        let leftIndex = findRegionIndex(left);

        if (aboveIndex !== undefined && leftIndex !== undefined) {
            if (aboveIndex != leftIndex) {
                // merge the left regions into the above region and delete the left one.
                regions[leftIndex].forEach(leftLoc => assign(leftLoc, aboveIndex));

                // When we cut out the left index, we need to shift all of the existing indices up one
                regions[leftIndex] = [];
            }
        }

        if (aboveIndex !== undefined) {
            return aboveIndex;
        }

        if (leftIndex !== undefined) {
            return leftIndex;
        }

        return undefined;
    };

    data.forEach((d, row) => {
        d.bits.forEach((b, index) => {
            const loc = { row: row, index: index };
            let regionIndex;
            if (b) {
                regionIndex = calculateByNeighbors(loc);
                regionIndex = assign(loc, regionIndex);
            }
            d.regionIndices[index] = regionIndex;
        });
    });

    return regions.reduce((v, r) => v + (r.length ? 1 : 0), 0);
};

// https://gist.github.com/aemkei/1180489
let pad = function (a, b) { return (1e15 + a + "").slice(-b); };

let dumpRegions = function (data, getVals, format) {
    data.forEach(d => {
        getVals(d).forEach(val => {
            //let out = region === undefined ? "  " : region.toString(16);
            process.stdout.write(format(val));
            process.stdout.write(" ");
        });
        console.log();
    });
};

let keys = [
    "flqrgnkx",
    "hfdlxzhv"
];

keys.forEach(key => {
    let data = generate(key);
    console.log(`${countUsed(data)} squares used for key ${key}`);
    console.log(`${countRegions(data)} regions contained in key ${key}`);
    console.log();

    const debug = false;
    if (debug) {
        dumpRegions(data, d => d.bits, b => b ? "* " : "  ");
        console.log();
        dumpRegions(data, d => d.regionIndices, idx => idx === undefined ? "    " : pad(idx, 4));
        console.log();
    }
});
// 14a: 8230
// 14b: 1103
