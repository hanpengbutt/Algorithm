const fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
matrix = matrix.map((row) => row.split(' ').map((v) => +v));

function solution(N, matrix) {
  let result = -Infinity;
  const psum = new Array(N).fill(0).map(() => new Array(N).fill(0));

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const val = matrix[row][col];
      psum[row][col] +=
        val +
        (row > 0 ? psum[row - 1][col] : 0) +
        (col > 0 ? psum[row][col - 1] : 0) -
        (row > 0 && col > 0 ? psum[row - 1][col - 1] : 0);
      if (val > result) result = val;
    }
  }

  for (let size = 2; size <= N; size++) {
    for (let start_row = 0; start_row <= N - size; start_row++) {
      for (let start_col = 0; start_col <= N - size; start_col++) {
        const val =
          psum[start_row + size - 1][start_col + size - 1] -
          (start_row > 0 ? psum[start_row - 1][start_col + size - 1] : 0) -
          (start_col > 0 ? psum[start_row + size - 1][start_col - 1] : 0) +
          (start_row > 0 && start_col > 0
            ? psum[start_row - 1][start_col - 1]
            : 0);

        if (val > result) result = val;
      }
    }
  }

  return result;
}

console.log(solution(N, matrix));
