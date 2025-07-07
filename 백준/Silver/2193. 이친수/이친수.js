let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const dp = new Array(N).fill(0).map(() => [1n, 1n]);

  for (let i = 1; i < N; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
    dp[i][1] = dp[i - 1][0];
  }

  return dp[N - 1][1].toString();
}

console.log(solution(N));
