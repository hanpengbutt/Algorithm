let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const matrix = input.slice(1).map((row) => row.split(''));

function solution(N, M, matrix) {
  let visitied = new Array(N).fill(0).map(() => new Array(M).fill(false));
  const vector = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function dfs(char, row, col, prev_row, prev_col) {
    visitied[row][col] = true;

    for (let i = 0; i < vector.length; i++) {
      const [dr, dc] = vector[i];

      const next_row = row + dr;
      const next_col = col + dc;

      if (
        next_row > -1 &&
        next_row < N &&
        next_col > -1 &&
        next_col < M &&
        matrix[next_row][next_col] === char
      ) {
        if (!visitied[next_row][next_col]) {
          if (dfs(char, next_row, next_col, row, col)) {
            return true;
          }
        } else if (
          prev_row !== -1 &&
          (next_row !== prev_row || next_col !== prev_col)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  dfs(matrix[1][2], 1, 2, -1, -1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (dfs(matrix[i][j], i, j, -1, -1)) {
        return 'Yes';
      }
      visitied = new Array(N).fill(0).map(() => new Array(M).fill(false));
    }
  }

  return 'No';
}

console.log(solution(N, M, matrix));
