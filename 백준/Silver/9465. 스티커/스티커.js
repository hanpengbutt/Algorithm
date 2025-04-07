let fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');
T = +T;

function solution(N, matrix) {
  const dp = new Array(2).fill(0).map(() => new Array(N).fill(0));
  dp[0][0] = matrix[0][0];
  dp[1][0] = matrix[1][0];
  dp[0][1] = dp[1][0] + matrix[0][1];
  dp[1][1] = dp[0][0] + matrix[1][1];

  for (let i = 2; i < N; i++) {
    dp[0][i] =
      Math.max(dp[1][i - 1], dp[0][i - 2], dp[1][i - 2]) + matrix[0][i];
    dp[1][i] =
      Math.max(dp[0][i - 1], dp[0][i - 2], dp[1][i - 2]) + matrix[1][i];
  }

  return Math.max(dp[0][N - 1], dp[1][N -1])
}

for (let i = 0; i < T; i++) {
  const N = +input[3 * i];
  const matrix = input
    .slice(3 * i + 1, 3 * (i + 1))
    .map((row) => row.split(' ').map(Number));

  console.log(solution(N, matrix));
}
