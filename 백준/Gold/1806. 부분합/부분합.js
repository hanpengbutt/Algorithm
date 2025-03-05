let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const s = input[1].split(' ').map(Number);

function solution(N, M, s) {
  let result = 0;

  let left = (right = 0);
  let sum = s[0];

  while (right < N) {
    if (sum >= M) {
      const len = right - left + 1;
      if (result === 0 || len < result) result = len;
      if (len === 1) break;

      sum -= s[left];
      left += 1;
    } else {
      right += 1;
      sum += s[right];
    }
  }

  return result;
}

console.log(solution(N, M, s));
