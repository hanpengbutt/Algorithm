let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const matrix = input
  .slice(1, 1 + N)
  .map((row) => row.split(' ').map((v) => +v));
const sections = input.slice(1 + N).map((s) => s.split(' ').map((v) => +v));

function solution(N, M, matrix, sections) {
  const result = [];
  const dp = new Array(N).fill(0).map(() => new Array(N).fill(0));

  dp[0][0] = matrix[0][0];
  for (let i = 1; i < N; i++) {
    dp[0][i] = dp[0][i - 1] + matrix[0][i];
    dp[i][0] = dp[i - 1][0] + matrix[i][0];
  }

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1] + matrix[i][j] - dp[i - 1][j - 1];
    }
  }

  for (let i = 0; i < M; i++) {
    const [startRow, startCol, endRow, endCol] = sections[i];
    if (startRow === 1 && startCol === 1) {
      result.push(dp[endRow - 1][endCol - 1]);
    } else {
      let sum = dp[endRow - 1][endCol - 1];
      if (startRow > 1) sum -= dp[startRow - 2][endCol - 1];
      if (startCol > 1) sum -= dp[endRow - 1][startCol - 2];
      if (startRow > 1 && startCol > 1) sum += dp[startRow - 2][startCol - 2];
      result.push(sum);
    }
  }

  return result.join('\n').trim();
}

console.log(solution(N, M, matrix, sections));
