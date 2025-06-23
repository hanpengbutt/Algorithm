let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, matrix) {
  let result = 0;
  let cheeseCount = matrix
    .map((row) => row.filter((v) => v === 1).length)
    .reduce((acc, cur) => (acc += cur));

  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function bfs(row, col, matrix) {
    const q = [];
    const visited = new Array(N).fill(0).map(() => new Array(M).fill(0));

    q.push([row, col]);
    let idx = 0;
    visited[row][col] = 1;
    matrix[row][col] = -1;

    while (idx < q.length) {
      const [nowRow, nowCol] = q[idx++];
      for (let [dr, dc] of vector) {
        const [nextRow, nextCol] = [nowRow + dr, nowCol + dc];
        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < M &&
          !visited[nextRow][nextCol] &&
          matrix[nextRow][nextCol] === 0
        ) {
          q.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = 1;
          matrix[nextRow][nextCol] = -1;
        }
      }
    }
  }

  for (let row = 0; row < N; row++) {
    let flag = 0;
    for (let col = 0; col < M; col++) {
      if (matrix[row][col] === 0) {
        bfs(row, col, matrix);
        flag = 1;
        break;
      }
    }
    if (flag) break;
  }

  while (cheeseCount) {
    const newMatrix = matrix.map((row) => [...row]);

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (matrix[row][col] === 1) {
          let airCount = 0;
          for (let [dr, dc] of vector) {
            const [nextRow, nextCol] = [row + dr, col + dc];
            if (
              -1 < nextRow &&
              nextRow < N &&
              -1 < nextCol &&
              nextCol < M &&
              matrix[nextRow][nextCol] === -1
            ) {
              airCount++;
            }
          }
          if (airCount >= 2) {
            bfs(row, col, newMatrix);
          }
        }
      }
    }

    matrix = newMatrix;
    cheeseCount = matrix
      .map((row) => row.filter((v) => v === 1).length)
      .reduce((acc, cur) => (acc += cur));

    result += 1;
  }

  return result;
}

console.log(solution(N, M, matrix));
