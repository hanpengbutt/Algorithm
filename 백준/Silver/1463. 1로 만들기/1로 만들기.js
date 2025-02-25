let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const dp = new Array(N + 1).fill(0);

  for (let i = 2; i < N + 1; i++) {
    let min = dp[i - 1];
    if (i % 2 === 0 && dp[i / 2] < min) min = dp[i / 2];
    if (i % 3 === 0 && dp[i / 3] < min) min = dp[i / 3];
    dp[i] = min + 1;
  }

  return dp[N]
}

console.log(solution(N));
