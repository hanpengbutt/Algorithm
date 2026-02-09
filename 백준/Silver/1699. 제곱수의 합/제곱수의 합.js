const fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const dp = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    let min = Infinity;
    for (let j = 1; i - j ** 2 >= 0; j++) {
      if (min > dp[i - j ** 2]) min = dp[i - j ** 2] + 1;
    }
    dp[i] = min;
  }

  return dp[N];
}

console.log(solution(N));
