let fs = require('fs');
let [N, K] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map((v) => +v);

function solution(N, K) {
  if (K === 1) return 1;
  if (K === 2) return N + 1;

  const dp = new Array(K - 2).fill(0).map(() => new Array(N + 1).fill(1n));
  for (let i = 0; i < N + 1; i++) {
    dp[0][i] = BigInt(i + 1);
  }

  for (let i = 1; i < K - 2; i++) {
    for (let j = 1; j < N + 1; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return Number(dp[K - 3].reduce((acc, cur) => (acc += cur) % 1000000000n));
}

console.log(solution(N, K));