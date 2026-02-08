const fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

const dp = new Array(N + 1).fill(0);

dp[1] = 1;

for (let i = 2; i < N + 1; i++) {
  const num = Math.sqrt(i);
  if (Math.ceil(num) === num) {
    dp[i] = 1;
  } else {
    let min = dp[1] + dp[i - 1];
    for (let j = 2; j < i / 2; j++) {
      if (dp[j] + dp[i - j] < min) min = dp[j] + dp[i - j];
    }
    dp[i] = min;
  }
}

console.log(dp[N]);
