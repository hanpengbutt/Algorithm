const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].split(' ').map((v) => +v);
const matrix = input.slice(1).map((row) => row.split('').map((v) => +v));

function solution(N, M, matrix) {
  const result = new Array(N)
    .fill(0)
    .map((_, rowIdx) =>
      new Array(M).fill(0).map((_, colIdx) => matrix[rowIdx][colIdx]),
    );
  const visited = new Array(N).fill(0).map(() => new Array(M).fill(0));
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function bfs(row, col) {
    visited[row][col] = 1;
    const queue = [[row, col]];
    let idx = 0;
    const walls = [];

    while (idx < queue.length) {
      const [nowRow, nowCol] = queue[idx++];

      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;

        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < M &&
          !visited[nextRow][nextCol]
        ) {
          visited[nextRow][nextCol] = 1;
          if (matrix[nextRow][nextCol]) {
            walls.push([nextRow, nextCol]);
          } else {
            queue.push([nextRow, nextCol]);
          }
        }
      });
    }

    walls.forEach((wall) => {
      const [wallRow, wallCol] = wall;
      result[wallRow][wallCol] += queue.length;
      visited[wallRow][wallCol] = 0;
    });
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (!matrix[row][col] && !visited[row][col]) {
        bfs(row, col);
      }
    }
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (result[row][col]) {
        result[row][col] = result[row][col] % 10;
      }
    }
  }

  return result.map((row) => row.join('')).join('\n');
}

console.log(solution(N, M, matrix));

