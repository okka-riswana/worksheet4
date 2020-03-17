import { mergeInversion } from "./merge-inversion";
import { interpolationSearch } from "./interpolation-search";
import { Point, closestPair } from "./closest-pair";

function problem1(): void {
  const charData = ["c", "d", "g", "a", "q", "f", "e", "b", "t", "m"];
  mergeInversion(charData);
}

function problem2(): void {
  const numData = [75, 84, 37, 25, 80, 38, 65, 70, 82, 70, 82, 90];

  const sortedNums = numData.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  const searchTarget = 65;
  const index = interpolationSearch(sortedNums, searchTarget);

  console.log(`Sorted Array: [${sortedNums}]`);
  console.log(`Search Target: ${searchTarget}`);
  console.log(`Target Index: ${index || "not found."}`);
}

function problem3(): void {
  // prettier-ignore
  const points = [
    new Point(-5, 14),    // 0
    new Point(-3, 11),    // 1
    new Point(2, 15),     // 2
    new Point(3, 10.5),   // 3
    new Point(5.5, 7.5),  // 4
    new Point(6.5, 11.5), // 5
    new Point(9.5, 10),   // 6
    new Point(7.5, 2.5),  // 7
    new Point(3.5, 2),    // 8
    new Point(0.5, 1),    // 9
    new Point(-2, 1),     // 10
    new Point(-6, 1),     // 11
    new Point(-5.5, 6),   // 12
    new Point(-7.5, 10),  // 13
    new Point(-4.5, 8),   // 14
    new Point(1, 7),      // 15
    new Point(-4, 3),     // 16
    new Point(0, 4),      // 17
    new Point(-1.5, 8.5), // 18
    new Point(8.5, 6.5),  // 19
  ];

  console.table(points);

  const sortX = (a: Point, b: Point) => (a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
  const sortY = (a: Point, b: Point) => (a.y < b.y ? -1 : a.y > b.y ? 1 : 0);

  // Sort not in-place
  const Px = [...points].sort(sortX);
  const Py = [...points].sort(sortY);

  const result = closestPair(Px, Py);

  console.log("\nClosest Pair:");
  console.log(
    `\tPoint A: ${points.indexOf(result.pair[0])} - (${result.pair[0].x}, ${
      result.pair[0].y
    })`
  );
  console.log(
    `\tPoint B: ${points.indexOf(result.pair[1])} - (${result.pair[1].x}, ${
      result.pair[1].y
    })`
  );
  console.log(`\tDistance: ${result.distance}`);
}

problem1();
problem2();
problem3();
