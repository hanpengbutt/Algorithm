const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [n, k] = input[0].split(' ').map((v) => +v);
const coins = input.slice(1).map((v) => +v);

function solution(n, k, coins) {
  const dp = new Array(k + 1).fill(-1);
  dp[0] = 0;

  for (let i = 1; i <= k; i++) {
    const r = [];

    coins.forEach((coin) => {
      if (i - coin >= 0 && dp[i - coin] !== -1) r.push(dp[i - coin]);
    });

    if (r.length) dp[i] = Math.min(...r) + 1;
  }

  return dp[k];
}

console.log(solution(n, k, coins));
