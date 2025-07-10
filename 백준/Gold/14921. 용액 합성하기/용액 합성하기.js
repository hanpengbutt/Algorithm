let fs = require('fs');
let [N, A] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
A = A.split(' ').map(Number);

function solution(N, A) {
  let left = 0;
  let right = N - 1;
  let result = Infinity;

  while (left < right) {
    const value = A[left] + A[right];

    if (value === 0) return 0;

    if (Math.abs(result) > Math.abs(value)) result = value;

    if (value > 0) {
      right--;
    } else {
      left++;
    }
  }

  return result;
}

console.log(solution(N, A));
