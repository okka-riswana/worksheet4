# Analisis Algoritma Worksheet 4B
```
Nama:  Okka Riswana
NPM:   140810180032
```
---

## 1. Counting Inversions
Berikut implementasi untuk menghitung *inversions* yang menggunakan algoritma *merge sort*:
```ts
type ArrayInversion<T> = { array: T[]; inversions: number };

function mergeInversion<T>(arr: T[]): ArrayInversion<T> {
  if (arr.length <= 1) {
    return { array: arr, inversions: 0 };
  }
  const mid = arr.length / 2;
  
  // Divide and recurse
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
      // Inversion found 
      c.push(b[j]);
      inversions += a.length - i;
      for (const inv of a.slice(i)) {
        console.log(` (${b[j]}, ${inv})`);
      }
      ++j;
    }
  }

  console.log(` - Total Inversions ${inversions}.`);
  return { array: c.concat(a.slice(i), b.slice(j)), inversions };
}
```

Menggunakan implementasi typescript diatas, didapatkan output:
```
Merging [c] and [d]:
 - Last Inversions 0.
 - Current Inversions 0.

Merging [a] and [q]:
 - Last Inversions 0.
 - Current Inversions 0.

Merging [g] and [a,q]:
 - Last Inversions 0.
 (a, g)
 - Current Inversions 1.

Merging [c,d] and [a,g,q]:
 - Last Inversions 1.
 (a, c)
 (a, d)
 - Current Inversions 3.

Merging [f] and [e]:
 - Last Inversions 0.
 (e, f)
 - Current Inversions 1.

Merging [t] and [m]:
 - Last Inversions 0.
 (m, t)
 - Current Inversions 1.

Merging [b] and [m,t]:
 - Last Inversions 1.
 - Current Inversions 1.

Merging [e,f]  and [b,m,t]:
 - Last Inversions 2.
 (b, e)
 (b, f)
 - Current Inversions 4.

Merging [a,c,d,g,q] and [b,e,f,m,t]:
 - Last Inversions 7.
 (b, c)
 (b, d)
 (b, g)
 (b, q)
 (e, g)
 (e, q)
 (f, g)
 (f, q)
 (m, q)
 - Current Inversions 16.
```
> $\therefore$ Jumlah *inversion* ada 16.

Menggunakan iterasi manual didapat hasil yang sama,
![](https://i.imgur.com/cvz7zXS.jpg =800x900)

---

## 2. Interpolation Search
Berikut implementasi dalam typescript:
```ts
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
```

Dengan input
```
Array: [75, 84, 37, 25, 80, 38, 65, 70, 82, 70, 82, 90]
Target: 65
```
didapatkan output
```
┌─────────┬───────────┬──────┬─────┬─────┐
│ (index) │ iteration │ high │ low │ mid │
├─────────┼───────────┼──────┼─────┼─────┤
│    0    │     1     │  11  │  0  │  6  │
│    1    │     2     │  5   │  0  │  4  │
│    2    │     3     │  3   │  0  │  3  │
└─────────┴───────────┴──────┴─────┴─────┘
Sorted Array: [25,37,38,65,70,70,75,80,82,82,84,90]
Search Target: 65
Target Index: 3
```

### Soal A
> Jelaskan, bagaimana proses pencarian interpolation search terjadi pada data array tersebut?

*Interpolation search* mirip sekali dengan *binary search*. Seperti namanya algoritma ini menggunakan *linear interpolation* untuk mengestimasi posisi dari data yang dicari. Dari implementasi diatas variabel hasil interpolasi adalah `mid` dan didapatkan dengan formula:
```
mid = Math.floor(
      low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
```

Untuk data setiap iterasinya dapat dilihat pada output dari implementasi diatas.

### Soal B
> Apakah data ditemukan?

Data ditemukan setelah 3 iterasi pada index ke-3.

### Soal C
> Berapa kompleksitas waktu yang dibutuhkan untuk proses pencarian yang Antonov lakukan?

Secara umum *interpolation search* memiliki $\Omega(1),\Theta(log(logn)),O(n)$ jika kita tidak menghitung proses *sorting*-nya. Pada data yang diberikan, *average case* berlaku dengan $log(log(n))$

---

## 3. Closest Pair of Points
![](https://i.imgur.com/hlSzmcN.png =800x)

### Soal A
> Tentukan pasangan titik mana yang mempunyai jarak terdekat (closest pair of points) dengan menggunakan paradigma divide & conquer. Perlihatkan setiap langkah iteratifnya.

```
closestPair of (xP, yP)
               where xP is P(1) .. P(N) sorted by x coordinate, and
                     yP is P(1) .. P(N) sorted by y coordinate (ascending order)
if N ≤ 3 then
  return closest points of xP using brute-force algorithm
else
  xL ← points of xP from 1 to ⌈N/2⌉
  xR ← points of xP from ⌈N/2⌉+1 to N
  xm ← xP(⌈N/2⌉)x
  yL ← { p ∈ yP : px ≤ xm }
  yR ← { p ∈ yP : px > xm }
  (dL, pairL) ← closestPair of (xL, yL)
  (dR, pairR) ← closestPair of (xR, yR)
  (dmin, pairMin) ← (dR, pairR)
  if dL < dR then
    (dmin, pairMin) ← (dL, pairL)
  endif
  yS ← { p ∈ yP : |xm - px| < dmin }
  nS ← number of points in yS
  (closest, closestPair) ← (dmin, pairMin)
  for i from 1 to nS - 1
    k ← i + 1
    while k ≤ nS and yS(k)y - yS(i)y < dmin
      if |yS(k) - yS(i)| < closest then
        (closest, closestPair) ← (|yS(k) - yS(i)|, {yS(k), yS(i)})
      endif
      k ← k + 1
    endwhile
  endfor
  return closest, closestPair
endif
```

Karena implementasinya terlalu panjang, maka dapat diakses di [Github](https://github.com/okka-riswana/worksheet4). Berikut output dari implementasinya

```
┌─────────┬──────┬──────┐
│ (index) │  x   │  y   │
├─────────┼──────┼──────┤
│    0    │  -5  │  14  │
│    1    │  -3  │  11  │
│    2    │  2   │  15  │
│    3    │  3   │ 10.5 │
│    4    │ 5.5  │ 7.5  │
│    5    │ 6.5  │ 11.5 │
│    6    │ 9.5  │  10  │
│    7    │ 7.5  │ 2.5  │
│    8    │ 3.5  │  2   │
│    9    │ 0.5  │  1   │
│   10    │  -2  │  1   │
│   11    │  -6  │  1   │
│   12    │ -5.5 │  6   │
│   13    │ -7.5 │  10  │
│   14    │ -4.5 │  8   │
│   15    │  1   │  7   │
│   16    │  -4  │  3   │
│   17    │  0   │  4   │
│   18    │ -1.5 │ 8.5  │
│   19    │ 8.5  │ 6.5  │
└─────────┴──────┴──────┘

Closest Pair:
        Point A: 12 - (-5.5, 6)
        Point B: 14 - (-4.5, 8)
        Distance: 2.23606797749979
```

### Soal B
> Seperti apa bentuk rekurensinya?
Rekursi dalam algoritma ini digunakan untuk membagi titik-titik menjadi 2 kemudian dicari titik yang paling dekat dalam pembagian tersebut.

### Soal C
> Berapa kompleksitas waktu yang dibutuhkan untuk menyelesaikan rekurens tersebut?

Kompleksitas waktu:
$\displaystyle T(n) = 2T(\frac{n}{2}) + O(n) + O(n \cdot log(n)) + O(n)$
$T(n) = 2T(\frac{n}{2}) + O(n \cdot log(n))$
$T(n) = T(n \cdot log(n) \cdot log(n))$
$T(n) = O(n \cdot (log(n))^2)$