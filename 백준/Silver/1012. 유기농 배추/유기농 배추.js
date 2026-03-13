const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const T = +input[0];
let j = 1;

function solution(M, N, K, cabbages) {
  let result = 0;
  const matrix = new Array(N).fill(0).map(() => new Array(M).fill(0));
  const visited = new Array(N).fill(0).map(() => new Array(M).fill(0));
  cabbages.forEach((cabbage) => {
    const [X, Y] = cabbage;
    matrix[Y][X] = 1;
  });
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function bfs(startRow, startCol) {
    const queue = [[startRow, startCol]];
    let idx = 0;
    visited[startRow][startCol] = 1;

    while (idx < queue.length) {
      const [row, col] = queue[idx++];
      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = row + dr;
        const nextCol = col + dc;
        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < M &&
          matrix[nextRow][nextCol] &&
          !visited[nextRow][nextCol]
        ) {
          queue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = 1;
        }
      });
    }
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (!visited[row][col] && matrix[row][col]) {
        bfs(row, col);
        result++;
      }
    }
  }
  return result;
}

for (let i = 0; i < T; i++) {
  const [M, N, K] = input[j].split(' ').map((v) => +v);
  const cabbages = input
    .slice(j + 1, j + K + 1)
    .map((cabbage) => cabbage.split(' ').map((v) => +v));
  console.log(solution(M, N, K, cabbages));
  j += K + 1;
}
