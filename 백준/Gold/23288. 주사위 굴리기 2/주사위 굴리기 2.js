let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, K, matrix) {
  // 위, 북, 동, 서, 남, 아래 순서
  let dice = new Array(6).fill(0).map((_, i) => i + 1);
  // 동, 남, 서, 북
  let vector = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  // 처음 이동 방향 동쪽
  let dir = 0;
  // 처음 좌표 (1, 1)
  let pos = [0, 0];
  // 점수의 합
  let result = 0;
  // 방문 정보
  let visited = new Array(N).fill(0).map(() => new Array(M).fill(0));

  // 주사위 이동 함수
  function moveDice(dir) {
    let newDice = [...dice];
    switch (dir) {
      case 0:
        // 동쪽으로 이동
        // 남, 북 유지
        newDice[0] = dice[3];
        newDice[2] = dice[0];
        newDice[3] = dice[5];
        newDice[5] = dice[2];
        break;
      case 1:
        // 남쪽으로 이동
        // 동, 서 유지
        newDice[0] = dice[1];
        newDice[1] = dice[5];
        newDice[4] = dice[0];
        newDice[5] = dice[4];
        break;
      case 2:
        // 서쪽으로 이동
        // 남, 북 유지
        newDice[0] = dice[2];
        newDice[2] = dice[5];
        newDice[3] = dice[0];
        newDice[5] = dice[3];
        break;
      case 3:
        // 북쪽으로 이동
        // 동, 서 유지
        newDice[0] = dice[4];
        newDice[1] = dice[0];
        newDice[4] = dice[5];
        newDice[5] = dice[1];
        break;
    }
    dice = newDice;
  }

  function bfs(row, col) {
    let idx = 0;
    const q = [[row, col]];
    visited[row][col] = 1;

    while (idx < q.length) {
      const [nowRow, nowCol] = q[idx++];
      vector.forEach(([dr, dc]) => {
        const [nextRow, nextCol] = [nowRow + dr, nowCol + dc];
        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < M &&
          !visited[nextRow][nextCol] &&
          matrix[row][col] === matrix[nextRow][nextCol]
        ) {
          q.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = 1;
        }
      });
    }

    q.forEach(([row, col]) => {
      visited[row][col] = q.length;
    });
  }

  for (let i = 0; i < K; i++) {
    const [nowRow, nowCol] = pos;
    let [dr, dc] = vector[dir];
    let [nextRow, nextCol] = [nowRow + dr, nowCol + dc];

    if (!(-1 < nextRow && nextRow < N && -1 < nextCol && nextCol < M)) {
      dir += dir < 2 ? 2 : -2;
      [dr, dc] = vector[dir];
      [nextRow, nextCol] = [nowRow + dr, nowCol + dc];
    }

    pos = [nextRow, nextCol];
    moveDice(dir);

    const A = dice[5];
    const B = matrix[nextRow][nextCol];
    if (!visited[nextRow][nextCol]) bfs(nextRow, nextCol);
    result += B * visited[nextRow][nextCol];

    if (A > B) {
      dir = (dir + 1) % 4;
    } else if (A < B) {
      dir = (dir + 3) % 4;
    }
  }

  return result;
}

console.log(solution(N, M, K, matrix));
