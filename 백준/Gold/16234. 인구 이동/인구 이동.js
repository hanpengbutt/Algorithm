let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, L, R] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, L, R, matrix) {
  let result = 0;

  function bfs(startRow, startCol, startVal, visited) {
    const vector = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    visited[startRow][startCol] = 1;
    const q = [[startRow, startCol, startVal]];
    let idx = 0;

    while (idx < q.length) {
      const [nowRow, nowCol] = q[idx];
      idx += 1;

      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;

        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < N &&
          !visited[nextRow][nextCol]
        ) {
          const diff = Math.abs(
            matrix[nextRow][nextCol] - matrix[nowRow][nowCol]
          );
          if (L <= diff && diff <= R) {
            visited[nextRow][nextCol] = 1;
            q.push([nextRow, nextCol, matrix[nextRow][nextCol]]);
          }
        }
      });
    }

    const count = ~~(q.reduce((acc, cur) => (acc += cur[2]), 0) / q.length);
    q.forEach(([row, col]) => {
      matrix[row][col] = count;
    });
  }

  while (1) {
    result += 1;
    const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
    let count = 0;

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (!visited[row][col]) {
          bfs(row, col, matrix[row][col], visited);
          count += 1;
        }
      }
    }

    if (count === N ** 2) break;
  }

  return result - 1;
}

console.log(solution(N, L, R, matrix));
