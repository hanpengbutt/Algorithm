let fs = require('fs');
let [M, N] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

function solution(M, N) {
  const nums = new Array(N).fill(0).map((_, i) => i + 1);

  nums[0] = '';
  for (let i = 2; i * i <= N; i++) {
    if (nums[i - 1]) {
      let j = 2;
      while (i * j <= N) {
        nums[i * j - 1] = '';
        j += 1;
      }
    }
  }

  return nums.filter((v, i) => i >= M - 1 && v).join('\n');
}

console.log(solution(M, N));
