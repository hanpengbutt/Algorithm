let fs = require('fs');
let [N, M] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

function solution(N, M) {
  const dp = new Array(N + 1).fill(0n);

  for (let i = 1; i < M; i++) {
    dp[i] = 1n;
  }

  dp[M] = 2n;

  for (let i = M + 1; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - M];
  }

  return (dp[N] % 1000000007n).toString();
}

console.log(solution(N, M));
