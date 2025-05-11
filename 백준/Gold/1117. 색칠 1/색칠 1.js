let fs = require('fs');
let [W, H, f, c, x1, y1, x2, y2] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map(BigInt);

function solution(W, H, f, c, x1, y1, x2, y2) {
  let result = W * H;

  let arr = [1, 2].map((v) => v * (Number(c) + 1));
  arr.sort((a, b) => b - a);
  arr = arr.map(BigInt);

  let count = 0n;

  const mid = W - f < f ? W - f : f;

  if (mid === 0n) {
    count += (x2 - x1) * arr[1];
  } else {
    if (x2 <= mid) {
      count += (x2 - x1) * arr[0];
    } else if (x1 >= mid) {
      count += (x2 - x1) * arr[1];
    } else {
      count += (mid - x1) * arr[0];
      count += (x2 - mid) * arr[1];
    }
  }

  result -= count * (y2 - y1);

  return result.toString();
}

console.log(solution(W, H, f, c, x1, y1, x2, y2));
