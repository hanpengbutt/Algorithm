const fs = require('fs');
const [N, r, c] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map((v) => +v);

function solution(N, r, c) {
  let result = 0;

  while (N > 0) {
    if (r >= 2 ** (N - 1)) {
      result += 4 ** (N - 1) * 2;
      r -= 2 ** (N - 1);
    }

    if (c >= 2 ** (N - 1)) {
      result += 4 ** (N - 1);
      c -= 2 ** (N - 1);
    }

    N--;
  }

  return result;
}

console.log(solution(N, r, c));
