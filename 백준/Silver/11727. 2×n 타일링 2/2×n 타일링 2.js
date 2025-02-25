let fs = require('fs');
let n = +fs.readFileSync(0, 'utf8').trim();

function solution(n) {
  if (n === 1) return 1;
  if (n === 2) return 3;

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1n;
  dp[2] = 3n;
  for (let i = 3; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] * 2n;
  }

  return Number(dp[n] % 10007n);
}

console.log(solution(n));
