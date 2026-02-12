const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [M, N] = input[0].split(' ').map((v) => +v);
const matrix = input.slice(1).map((row) => row.split('').map((v) => +v));

function solution(M, N, matrix) {
  const visited = new Array(M).fill(0).map(() => new Array(N).fill(0));
  const vector = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function bfs() {
    let result = 0;
    let idx = 0;
    const queue = [];
    for (let i = 0; i < N; i++) {
      if (!matrix[M - 1][i]) {
        visited[M - 1][i] = 1;
        queue.push([M - 1, i]);
      }
    }

    while (idx < queue.length) {
      const [row, col] = queue[idx++];
      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = row + dr;
        const nextCol = col + dc;

        if (
          -1 < nextRow &&
          nextRow < M &&
          -1 < nextCol &&
          nextCol < N &&
          !matrix[nextRow][nextCol] &&
          !visited[nextRow][nextCol]
        ) {
          if (nextRow === 0) {
            result = 1;
            return;
          }
          visited[nextRow][nextCol] = 1;
          queue.push([nextRow, nextCol]);
        }
      });

      if (result) return 'YES';
    }

    return 'NO';
  }

  return bfs();
}

console.log(solution(M, N, matrix));