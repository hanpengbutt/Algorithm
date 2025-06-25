let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
const ranges = input.slice(N + 2).map((range) => range.split(' ').map(Number));

function solution(N, M, ranges) {
  const result = [];
  const dp = matrix.map((row) => [...row]);

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (row) {
        dp[row][col] += dp[row - 1][col];
      }
      if (col) {
        dp[row][col] += dp[row][col - 1];
      }
      if (row && col) {
        dp[row][col] -= dp[row - 1][col - 1];
      }
    }
  }

  for (let [x1, y1, x2, y2] of ranges) {
    let sum = dp[x2 - 1][y2 - 1];

    if (x1 - 1) {
      sum -= dp[x1 - 2][y2 - 1];
    }
    if (y1 - 1) {
      sum -= dp[x2 - 1][y1 - 2];
    }
    if (x1 - 1 && y1 - 1) {
      sum += dp[x1 - 2][y1 - 2];
    }

    result.push(sum);
  }

  return result.join('\n');
}

console.log(solution(N, M, ranges));
