let fs = require('fs');
let [t, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

t = +t;
input = input.map((t) => t.split(' ').map(Number));

function solution() {
  const dp = new Array(31).fill(0).map(() => new Array(31).fill(0));

  for (let i = 1; i <= 30; i++) {
    dp[1][i] = i;
  }

  for (let i = 2; i <= 30; i++) {
    for (let j = i; j <= 30; j++) {
      if (i === j) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
      }
    }
  }
  
  for (let i = 0; i < t; i++) {
    const [N, M] = input[i];
    console.log(dp[N][M]);
  }
}

solution()
