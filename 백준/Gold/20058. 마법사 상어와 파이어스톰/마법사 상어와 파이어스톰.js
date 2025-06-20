let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, _] = input[0].split(' ').map(Number);
const matrix = input
  .slice(1, 1 + 2 ** N)
  .map((row) => row.split(' ').map(Number));
const L = input[1 + 2 ** N].split(' ').map(Number);

function solution(N, L, matrix) {
  const result = [0, 0];
  const totalLen = 2 ** N;
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = new Array(totalLen)
    .fill(0)
    .map(() => new Array(totalLen).fill(0));

  function bfs(node) {
    const q = [];
    q.push(node);
    let idx = 0;

    const [row, col] = node;
    visited[row][col] = 1;

    while (idx < q.length) {
      const [nowRow, nowCol] = q[idx++];
      for (let [dr, dc] of vector) {
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;
        if (
          -1 < nextRow &&
          nextRow < totalLen &&
          -1 < nextCol &&
          nextCol < totalLen &&
          !visited[nextRow][nextCol] &&
          matrix[nextRow][nextCol]
        ) {
          q.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = 1;
        }
      }
    }

    return q.length;
  }

  for (let l of L) {
    let newMatrix = new Array(totalLen)
      .fill(0)
      .map(() => new Array(totalLen).fill(0));
    const fracLen = 2 ** l;
    const count = totalLen / fracLen;

    // 격자 개수만큼 반복
    for (let i = 0; i < count ** 2; i++) {
      // 격자에 칸 개수만큼 반복
      for (let j = 0; j < fracLen ** 2; j++) {
        newMatrix[(j % fracLen) + ~~(i / count) * fracLen][
          fracLen - ~~(j / fracLen) - 1 + (i % count) * fracLen
        ] =
          matrix[~~(j / fracLen) + ~~(i / count) * fracLen][
            (j % fracLen) + (i % count) * fracLen
          ];
      }
    }

    matrix = newMatrix.map((row) => [...row]);

    for (let row = 0; row < totalLen; row++) {
      for (let col = 0; col < totalLen; col++) {
        if (matrix[row][col]) {
          let cell = 0; // 얼음이 있는 인접한 칸의 개수
          for ([dr, dc] of vector) {
            if (
              -1 < row + dr &&
              row + dr < totalLen &&
              -1 < col + dc &&
              col + dc < totalLen &&
              matrix[row + dr][col + dc]
            ) {
              cell++;
            }
          }
          if (cell < 3) {
            newMatrix[row][col] -= 1;
          }
        }
      }
    }
    matrix = newMatrix;
  }

  for (let row = 0; row < totalLen; row++) {
    for (let col = 0; col < totalLen; col++) {
      if (matrix[row][col]) {
        result[0] += matrix[row][col];
        let count = bfs([row, col]);
        if (count > result[1]) result[1] = count;
      }
    }
  }

  console.log(result.join('\n'));
}

solution(N, L, matrix);
