export type ArrayInversion<T> = { array: T[]; inversions: number };

export function mergeInversion<T>(arr: T[]): ArrayInversion<T> {
  if (arr.length <= 1) {
    return { array: arr, inversions: 0 };
  }
  const mid = arr.length / 2;
  const { array: a, inversions: ai } = mergeInversion(arr.slice(0, mid));
  const { array: b, inversions: bi } = mergeInversion(arr.slice(mid));
  const c: T[] = [];
  let inversions = 0 + ai + bi;
  let i = 0,
    j = 0;

  console.log(`\nMerging [${a}] and [${b}]:`);
  console.log(` - Last Inversions ${inversions}.`);

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      c.push(a[i]);
      ++i;
    } else {
      c.push(b[j]);
      inversions += a.length - i;
      for (const inv of a.slice(i)) {
        console.log(`(${b[j]}, ${inv})`);
      }
      ++j;
    }
  }

  console.log(` - Current Inversions ${inversions}.`);

  return { array: c.concat(a.slice(i), b.slice(j)), inversions };
}
