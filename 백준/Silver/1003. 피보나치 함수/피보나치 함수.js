let fs = require('fs');
let [T, ...N] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map(Number);

function solution(T, N) {
  const dp = new Array(41).fill(0).map(() => [0, 0]);

  dp[0][0] = 1;
  dp[1][1] = 1;

  for (let i = 2; i < dp.length; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
    dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
  }

  for (let i = 0; i < T; i++) {
    console.log(dp[N[i]].join(' '));
  }
}

solution(T, N);
