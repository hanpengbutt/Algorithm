let fs = require('fs');
let [n, ...val] = fs.readFileSync(0, 'utf8').trim().split('\n');

n = +n;
val = val.map((row) => row.split(' ').map((v) => +v));

function solution(n, val) {
  const dp = new Array(n).fill(0).map(() => new Array(5).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      dp[n - i - 1][j] = val[i][j];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j + 1]) + dp[i][j];
    }
  }

  return dp[n - 1][0];
}

console.log(solution(n, val));
