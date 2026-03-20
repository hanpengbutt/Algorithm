const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, K] = input[0].split(' ').map((v) => +v);
const matrix = input.slice(1).map((row) => row.split(''));

function solution(N, M, K, matrix) {
  const counts = new Array(N)
    .fill(0)
    .map((_, row) =>
      new Array(M).fill(0).map((_, col) => (matrix[row][col] === 'B' ? 0 : 1)),
    );

  const psum1 = new Array(N - K + 1).fill(0).map(() => new Array(M).fill(0));
  let psum2 = new Array(N - K + 1)
    .fill(0)
    .map(() => new Array(M - K + 1).fill(0));

  for (let row = 0; row < N - K + 1; row++) {
    for (let col = 0; col < M; col++) {
      if (row === 0) {
        let sum = 0;
        let color = 0;
        for (let r = row; r < row + K; r++) {
          sum += color === 0 ? counts[r][col] : (counts[r][col] + 1) % 2;
          color = (color + 1) % 2;
        }
        psum1[row][col] = sum;
      } else {
        const sum =
          (K - psum1[row - 1][col]) -
          ((counts[row - 1][col] + 1) % 2) +
          (K % 2 === 0
            ? (counts[row + K - 1][col] + 1) % 2
            : counts[row + K - 1][col]);
        psum1[row][col] = sum;
      }
    }
  }

  for (let col = 0; col < M - K + 1; col++) {
    for (let row = 0; row < N - K + 1; row++) {
      if (col === 0) {
        let sum = 0;
        let color = 0;
        for (let c = col; c < col + K; c++) {
          sum += color === 0 ? psum1[row][c] : K - psum1[row][c];
          color = (color + 1) % 2;
        }
        psum2[row][col] = sum;
      } else {
        const sum =
          (K ** 2 - psum2[row][col - 1]) -
          (K - psum1[row][col - 1]) +
          (K % 2 === 0 ? K - psum1[row][col + K - 1] : psum1[row][col + K - 1]);
        psum2[row][col] = sum;
      }
    }
  }

  psum2 = psum2.flat();

  return Math.min(Math.min(...psum2), K ** 2 - Math.max(...psum2));
}

console.log(solution(N, M, K, matrix));
