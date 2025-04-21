let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(''));

function solution(N, matrix) {
  let result = 1;

  function getCount() {
    let max = 1;
    for (let row = 0; row < N; row++) {
      let count = 1;
      let candy = matrix[row][0];
      for (let col = 1; col < N; col++) {
        if (matrix[row][col] === candy) {
          count += 1;
          if (count > max) max = count;
        } else {
          count = 1;
          candy = matrix[row][col];
        }
      }
    }

    for (let col = 0; col < N; col++) {
      let count = 1;
      let candy = matrix[0][col];
      for (let row = 1; row < N; row++) {
        if (matrix[row][col] === candy) {
          count += 1;
          if (count > max) max = count;
        } else {
          count = 1;
          candy = matrix[row][col];
        }
      }
    }

    return max;
  }

  function select(row, col) {
    if (col !== N - 1) {
      const a = matrix[row][col];
      const b = matrix[row][col + 1];

      matrix[row][col + 1] = a;
      matrix[row][col] = b;

      const count = getCount();
      if (count > result) result = count;

      matrix[row][col] = a;
      matrix[row][col + 1] = b;
    }

    if (row !== N - 1) {
      const a = matrix[row][col];
      const b = matrix[row + 1][col];

      matrix[row + 1][col] = a;
      matrix[row][col] = b;

      const count = getCount();
      if (count > result) result = count;

      matrix[row][col] = a;
      matrix[row + 1][col] = b;
    }
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      select(row, col);
    }
  }

  return result;
}

console.log(solution(N, matrix));
