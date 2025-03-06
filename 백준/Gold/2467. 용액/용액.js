let fs = require('fs');
let [N, s] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
s = s.split(' ').map(Number);

function solution(N, s) {
  let left = 0;
  let right = N - 1;
  let result = [s[left], s[right]];
  let sum = Math.abs(s[left] + s[right]);

  while (left < right) {
    if (Math.abs(s[left] + s[right]) < sum) {
        sum = Math.abs(s[left] + s[right]);
        result = [s[left], s[right]];
      }

    if (s[left] + s[right] === 0) {
      result = [s[left], s[right]];
      break;
    } else if (s[left] + s[right] > 0) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return result.join(' ');
}

console.log(solution(N, s));
