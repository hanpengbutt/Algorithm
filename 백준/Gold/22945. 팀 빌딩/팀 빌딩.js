const fs = require('fs');
let [N, powers] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
powers = powers.split(' ').map((p) => +p);

function solution(N, powers) {
  let result = 0;
  let l = 0;
  let r = N - 1;

  while (l < r) {
    if (powers[l] < powers[r]) {
      result = Math.max(result, (r - l - 1) * powers[l++]);
    } else {
      result = Math.max(result, (r - l - 1) * powers[r--]);
    }
  }

  return result;
}

console.log(solution(N, powers));
