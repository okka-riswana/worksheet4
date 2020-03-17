export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export type PairPoints = { distance: number; pair: [Point, Point] };

export function closestPair(Px: Point[], Py: Point[]): PairPoints {
  if (Px.length < 2) {
    return { distance: Infinity, pair: [new Point(0, 0), new Point(0, 0)] };
  }

  if (Px.length < 3) {
    //find euclid distance
    var d = Math.sqrt(
      Math.pow(Math.abs(Px[1].x - Px[0].x), 2) +
        Math.pow(Math.abs(Px[1].y - Px[0].y), 2)
    );
    return {
      distance: d,
      pair: [Px[0], Px[1]]
    };
  }

  const n = Px.length,
    leftN = Math.floor(n / 2),
    rightN = leftN;

  const Xl = Px.slice(0, leftN),
    Xr = Px.slice(rightN),
    Xm = Xl[leftN - 1],
    Yl = [],
    Yr = [];

  // Separate Py
  for (const py of Py) {
    if (py.x <= Xm.x) {
      Yl.push(py);
    } else {
      Yr.push(py);
    }
  }

  // Divide and recurse
  const dLeft = closestPair(Xl, Yl);
  const dRight = closestPair(Xr, Yr);

  let minDelta = dLeft.distance;
  let curClosest = dLeft.pair;
  if (dLeft.distance > dRight.distance) {
    minDelta = dRight.distance;
    curClosest = dRight.pair;
  }

  // Filter points around Xm within delta (minDelta)
  const closeY = [];
  for (const py of Py) {
    if (Math.abs(py.x - Xm.x) < minDelta) closeY.push(py);
  }

  // Find min within delta. 8 steps max
  for (let i = 0; i < closeY.length; i += 1) {
    for (let j = i + 1; j < Math.min(i + 8, closeY.length); j += 1) {
      let d = Math.sqrt(
        Math.pow(Math.abs(closeY[j].x - closeY[i].x), 2) +
          Math.pow(Math.abs(closeY[j].y - closeY[i].y), 2)
      );
      if (d < minDelta) {
        minDelta = d;
        curClosest = [closeY[i], closeY[j]];
      }
    }
  }

  return {
    distance: minDelta,
    pair: curClosest
  };
}
