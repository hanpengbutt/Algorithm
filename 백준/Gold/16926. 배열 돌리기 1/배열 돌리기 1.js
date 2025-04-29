let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, R] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, R, matrix) {
  let startRow = 0;
  let startCol = 0;
  const vector = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (let i = 0; i < Math.ceil(Math.min(N, M) / 2); i++) {
    let line = [matrix[startRow][startCol]];
    let nextRow = startRow;
    let nextCol = startCol;

    vector.forEach((v) => {
      const [dr, dc] = v;
      nextRow += dr;
      nextCol += dc;

      while (
        -1 + startRow < nextRow &&
        nextRow < N - startRow &&
        -1 + startCol < nextCol &&
        nextCol < M - startCol &&
        !(nextRow === startRow && nextCol === startCol)
      ) {
        line.push(matrix[nextRow][nextCol]);
        nextRow += dr;
        nextCol += dc;
      }
      nextRow -= dr;
      nextCol -= dc;
    });

    const c = R % line.length;
    line = line.slice(line.length - c).concat(line.slice(0, line.length - c));

    let idx = 0;
    nextRow = startRow;
    nextCol = startCol;
    matrix[nextRow][nextCol] = line[idx];
    idx += 1;

    vector.forEach((v) => {
      const [dr, dc] = v;
      nextRow += dr;
      nextCol += dc;

      while (
        -1 + startRow < nextRow &&
        nextRow < N - startRow &&
        -1 + startCol < nextCol &&
        nextCol < M - startCol &&
        !(nextRow === startRow && nextCol === startCol)
      ) {
        matrix[nextRow][nextCol] = line[idx];
        nextRow += dr;
        nextCol += dc;
        idx += 1;
      }
      nextRow -= dr;
      nextCol -= dc;
    });

    startRow += 1;
    startCol += 1;
  }

  return matrix.map((row) => row.join(' ')).join('\n');
}

console.log(solution(N, M, R, matrix));
