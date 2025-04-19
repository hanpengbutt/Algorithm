let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, matrix) {
  let sharkPos;
  let time = 0;
  let sharkSize = 2;
  let eatingCount = 0;

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (matrix[row][col] === 9) {
        sharkPos = [row, col];
        break;
      }
    }
    if (sharkPos) break;
  }

  // 위쪽, 왼쪽, 오른쪽, 아래 방향 순서부터 텀색
  const vector = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  function bfs(row, col) {
    const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
    const q = [];
    let idx = 0;
    let tempTime = Infinity;
    let tempRow = N;
    let tempCol = N;

    visited[row][col] = 1;
    q.push([row, col]);

    while (idx < q.length) {
      const [nowRow, nowCol] = q[idx];
      idx += 1;

      for (let i = 0; i < 4; i++) {
        const [dr, dc] = vector[i];
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;

        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < N &&
          !visited[nextRow][nextCol]
        ) {
          if (
            matrix[nextRow][nextCol] === 0 ||
            matrix[nextRow][nextCol] === sharkSize
          ) {
            q.push([nextRow, nextCol]);
            visited[nextRow][nextCol] = visited[nowRow][nowCol] + 1;
          } else if (matrix[nextRow][nextCol] < sharkSize) {
            if (visited[nowRow][nowCol] <= tempTime) {
              tempTime = visited[nowRow][nowCol];
              if (
                nextRow < tempRow ||
                (nextRow === tempRow && nextCol < tempCol)
              ) {
                tempRow = nextRow;
                tempCol = nextCol;
              }
            } else {
              break;
            }
          }
        }
      }
    }

    if (tempRow === N && tempCol === N) {
      return false;
    } else {
      // 이동 시간 추가
      time += tempTime;
      // 이동 적용
      matrix[row][col] = 0;
      matrix[tempRow][tempCol] = 9;
      sharkPos = [tempRow, tempCol];
      // 먹은 물고기 수 추가
      eatingCount += 1;
      if (eatingCount === sharkSize) {
        sharkSize += 1;
        eatingCount = 0;
      }
      return true
    }
  }

  // 아기 상어가 있는 위치에 대해서 bfs
  while (1) {
    if (!bfs(sharkPos[0], sharkPos[1])) {
      break;
    }
  }

  return time;
}

console.log(solution(N, matrix));