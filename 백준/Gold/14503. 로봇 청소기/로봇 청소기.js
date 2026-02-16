const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const [r, c, d] = input[1].split(' ').map((v) => +v);
const matrix = input.slice(2).map((row) => row.split(' ').map((v) => +v));

function solution(N, M, r, c, d, matrix) {
  const vector = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let result = 0;

  while (1) {
    if (matrix[r][c] === 0) {
      matrix[r][c] = 2;
      result++;
    }

    let prevDir = d;
    let prevRow = r;
    let prevCol = c;

    for (let i = 1; i <= 4; i++) {
      d = (prevDir - i + 4) % 4;
      const [dr, dc] = vector[d];
      const nextRow = r + dr;
      const nextCol = c + dc;

      if (
        -1 < nextRow &&
        nextRow < N &&
        -1 < nextCol &&
        nextCol < M &&
        matrix[nextRow][nextCol] === 0
      ) {
        r = nextRow;
        c = nextCol;
        break;
      }
    }

    if (prevRow === r && prevCol === c) {
      let [dr, dc] = vector[d];
      dr *= -1;
      dc *= -1;
      const nextRow = r + dr;
      const nextCol = c + dc;

      if (
        -1 < nextRow &&
        nextRow < N &&
        -1 < nextCol &&
        nextCol < M &&
        matrix[nextRow][nextCol] !== 1
      ) {
        r = nextRow;
        c = nextCol;
      } else {
        break;
      }
    }
  }

  return result;
}

console.log(solution(N, M, r, c, d, matrix));
