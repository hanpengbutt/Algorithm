let fs = require('fs');
let [M, N] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

function solution(M, N) {
  const nums = new Array(N + 1).fill(0).map((_, i) => i);
  nums[1] = 0;

  for (let i = 2; i * i <= N; i++) {
    if (nums[i]) {
      for (let j = i * i; j <= N; j += i) {
        nums[j] = 0;
      }
    }
  }

  return nums.filter((v, i) => i >= M && v).join('\n');
}

console.log(solution(M, N));
