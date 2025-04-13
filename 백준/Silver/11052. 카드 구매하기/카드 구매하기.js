let fs = require('fs');
let [N, prices] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
prices = prices.split(' ').map(Number);

function solution(N, prices) {
  const dp = new Array(N + 1).fill(0);

  dp[1] = prices[0];

  for (let i = 2; i <= N; i++) {
    const arr = [prices[i - 1]];
    for (let j = 1; j < i; j++) {
      arr.push(dp[j] + prices[i - j - 1]);
    }
    dp[i] = Math.max(...arr);
  }

  return dp[N];
}

console.log(solution(N, prices));
