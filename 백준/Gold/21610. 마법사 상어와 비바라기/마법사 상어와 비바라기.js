let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1, 1 + N).map((row) => row.split(' ').map(Number));
const moves = input.slice(1 + N).map((move) => move.split(' ').map(Number));

function solution(N, M, matrix, moves) {
  const vector1 = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];

  const vector2 = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  let clouds = [
    [N - 2, 0],
    [N - 2, 1],
    [N - 1, 0],
    [N - 1, 1],
  ];

  moves.forEach((move) => {
    let [d, s] = move;
    s = s % N; // 구름의 이동 횟수
    const [dr, dc] = vector1[d - 1]; // 구름의 이동 방향

    const moveClouds = [];

    clouds.forEach((cloud) => {
      const [nowRow, nowCol] = cloud;
      let nextRow = nowRow + dr * s;
      let nextCol = nowCol + dc * s;
      nextRow = nextRow > 0 ? nextRow % N : (nextRow + N) % N;
      nextCol = nextCol > 0 ? nextCol % N : (nextCol + N) % N;
      moveClouds.push(N * nextRow + nextCol);
      matrix[nextRow][nextCol] += 1;
    });

    moveClouds.forEach((cloud) => {
      const nowRow = ~~(cloud / N);
      const nowCol = cloud % N;

      let copy = 0;
      vector2.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;
        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < N &&
          matrix[nextRow][nextCol]
        ) {
          copy += 1;
        }
      });
      matrix[nowRow][nowCol] += copy;
    });

    const newClouds = [];
    matrix.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val >= 2 && !moveClouds.includes(N * rowIdx + colIdx)) {
          newClouds.push([rowIdx, colIdx]);
          matrix[rowIdx][colIdx] -= 2;
        }
      });
    });

    clouds = newClouds;
  });
  
  return matrix.map((row) => row.reduce((acc, cur) => acc += cur)).reduce((acc, cur) => acc += cur)
}

console.log(solution(N, M, matrix, moves));
