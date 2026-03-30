const fs = require('fs');
const input = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v)
  .slice(1);

function solution(input) {
  const dp = new Array(10 ** 6 + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i < dp.length; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000009;
  }

  return input.map((v) => dp[v]).join('\n');
}

console.log(solution(input));
