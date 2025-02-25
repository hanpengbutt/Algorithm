let fs = require('fs');
let [N, nums, M, ...cases] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

N = +N;
nums = nums.split(' ');
M = +M;
cases = cases.map((c) => c.split(' ').map((v) => +v));

function solution(N, M, nums, cases) {
  const result = [];
  const dp = new Array(N + 1).fill(0).map(() => new Array(N + 1).fill(0));

  for (let i = N; i > 0; i--) {
    for (let j = i; j < N + 1; j++) {
      if (i === j) {
        // 길이가 1일 때
        if (nums[i - 1] === nums[i - 1]) {
          dp[i][j] = 1;
        }
      } else {
        if (i + 1 <= j - 1) {
          // 길이가 3 이상일 때
          if (
            dp[i + 1][j - 1] &&
            nums[i - 1] === nums[j - 1]
          )
            dp[i][j] = 1;
        } else {
          // 길이가 2일 때
          if (nums[i - 1] === nums[j - 1]) dp[i][j] = 1;
        }
      }
    }
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = cases[i];
    result.push(dp[start][end]);
  }

  return result.join('\n').trim();
}

console.log(solution(N, M, nums, cases));
