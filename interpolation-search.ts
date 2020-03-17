export function interpolationSearch(
  arr: number[],
  target: number
): number | undefined {
  // Data for diagnostics
  const diag: {
    iteration: number;
    low: number;
    high: number;
    mid: number;
  }[] = [];

  let low = 0,
    high = arr.length - 1;
  let iteration = 0;
  while (arr[low] < target && arr[high] >= target) {
    // Increment iteration counter
    iteration++;

    // Target index estimation
    const mid = Math.floor(
      low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    // Get current iteration data
    diag.push({ iteration, high, low, mid });

    if (arr[mid] < target) {
      low = mid + 1;
    } else if (arr[mid] > target) {
      high = mid - 1;
    } else {
      console.table(diag);
      // Target found
      return mid;
    }
  }

  console.table(diag);

  // Target is in lowest index or not found
  return arr[low] === target ? low : undefined;
}
