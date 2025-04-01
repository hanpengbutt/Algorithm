let fs = require('fs');
let n = +fs.readFileSync(0, 'utf8').trim();

function solution(n) {
  const dp = new Array(n + 1).fill(1n);

  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 3];
  }

  return dp[n].toString();
}

console.log(solution(n));
