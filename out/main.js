"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_inversion_1 = require("./merge-inversion");
const interpolation_search_1 = require("./interpolation-search");
const closest_pair_1 = require("./closest-pair");
function problem1() {
    const charData = ["c", "d", "g", "a", "q", "f", "e", "b", "t", "m"];
    merge_inversion_1.mergeInversion(charData);
}
function problem2() {
    const numData = [75, 84, 37, 25, 80, 38, 65, 70, 82, 70, 82, 90];
    const sortedNums = numData.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
    const searchTarget = 65;
    const index = interpolation_search_1.interpolationSearch(sortedNums, searchTarget);
    console.log(`Sorted Array: [${sortedNums}]`);
    console.log(`Search Target: ${searchTarget}`);
    console.log(`Target Index: ${index || "not found."}`);
}
function problem3() {
    // prettier-ignore
    const points = [
        new closest_pair_1.Point(-5, 14),
        new closest_pair_1.Point(-3, 11),
        new closest_pair_1.Point(2, 15),
        new closest_pair_1.Point(3, 10.5),
        new closest_pair_1.Point(5.5, 7.5),
        new closest_pair_1.Point(6.5, 11.5),
        new closest_pair_1.Point(9.5, 10),
        new closest_pair_1.Point(7.5, 2.5),
        new closest_pair_1.Point(3.5, 2),
        new closest_pair_1.Point(0.5, 1),
        new closest_pair_1.Point(-2, 1),
        new closest_pair_1.Point(-6, 1),
        new closest_pair_1.Point(-5.5, 6),
        new closest_pair_1.Point(-7.5, 10),
        new closest_pair_1.Point(-4.5, 8),
        new closest_pair_1.Point(1, 7),
        new closest_pair_1.Point(-4, 3),
        new closest_pair_1.Point(0, 4),
        new closest_pair_1.Point(-1.5, 8.5),
        new closest_pair_1.Point(8.5, 6.5),
    ];
    console.table(points);
    const sortX = (a, b) => (a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
    const sortY = (a, b) => (a.y < b.y ? -1 : a.y > b.y ? 1 : 0);
    // Sort not in-place
    const Px = [...points].sort(sortX);
    const Py = [...points].sort(sortY);
    console.table(Px);
    console.table(Py);
    const result = closest_pair_1.closestPair(Px, Py);
    console.log("\nClosest Pair:");
    console.log(`\tPoint A: ${points.indexOf(result.pair[0])} - (${result.pair[0].x}, ${result.pair[0].y})`);
    console.log(`\tPoint B: ${points.indexOf(result.pair[1])} - (${result.pair[1].x}, ${result.pair[1].y})`);
    console.log(`\tDistance: ${result.distance}`);
}
problem3();
//# sourceMappingURL=main.js.map