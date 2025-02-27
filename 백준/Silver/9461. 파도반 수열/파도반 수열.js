let fs = require('fs');
let [T, ...N] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v);

function solution(T, N) {
  const result = [];
  const maxN = Math.max(...N);
  const dp = new Array(maxN < 3 ? 3 : maxN);
  dp[0] = dp[1] = dp[2] = 1;

  for (let i = 3; i < maxN; i++) {
    dp[i] = dp[i - 2] + dp[i - 3];
  }

  for (let i = 0; i < T; i++) {
    result.push(dp[N[i] - 1])
  }

  return result.join('\n').trim()
}

console.log(solution(T, N));
