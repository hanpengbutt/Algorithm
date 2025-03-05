let fs = require('fs');
let [N, s, x] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
s = s.split(' ').map(Number);
x = +x;

function solution(N, s, x) {
  let result = 0;
  let left = 0;
  let right = N - 1;

  s.sort((a, b) => a - b);

  while (left < right) {
    if (s[left] + s[right] === x) {
      result += 1;
      left += 1;
      right -= 1;
    } else if (s[left] + s[right] > x) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return result;
}

console.log(solution(N, s, x));
