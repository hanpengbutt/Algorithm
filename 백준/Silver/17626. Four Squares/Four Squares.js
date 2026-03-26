const fs = require('fs');
const n = +fs.readFileSync(0, 'utf8').trim();

function solution(n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    const sqrt = ~~Math.sqrt(i);
    if (sqrt === Math.sqrt(i)) {
      dp[i] = 1;
    } else {
      dp[i] =
        Math.min(
          ...new Array(sqrt).fill(0).map((_, idx) => dp[i - (idx + 1) ** 2]),
        ) + 1;
    }
  }

  return dp[n];
}

console.log(solution(n));
