let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split('').map(Number));

function solution(N, M, matrix) {
  const vector = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0]
  ];

  const visited = new Array(N)
    .fill(0)
    .map(() => new Array(M).fill(0).map(() => [0, 0]));
  visited[0][0] = [1, 0];
  const q = [[0, 0, 0]];
  let idx = 0;

  while (
    idx < q.length &&
    !visited[N - 1][M - 1][0] &&
    !visited[N - 1][M - 1][1]
  ) {
    const [nowRow, nowCol, isBroken] = q[idx];
    idx += 1;

    vector.forEach((v) => {
      const [dr, dc] = v;
      const nextRow = nowRow + dr;
      const nextCol = nowCol + dc;
      if (-1 < nextRow && nextRow < N && -1 < nextCol && nextCol < M) {
        if (!matrix[nextRow][nextCol] && !visited[nextRow][nextCol][isBroken]) {
          // 다음 칸이 벽이 아닌 경우
          visited[nextRow][nextCol][isBroken] =
            visited[nowRow][nowCol][isBroken] + 1;
          q.push([nextRow, nextCol, isBroken]);
        } else if (!isBroken && !visited[nextRow][nextCol][1]) {
          // 다음 칸이 벽이지만, 아직 벽을 부슨 적이 없는 경우
          visited[nextRow][nextCol][1] = visited[nowRow][nowCol][0] + 1;
          q.push([nextRow, nextCol, 1]);
        }
      }
    });
  }

  return visited[N - 1][M - 1][0] || visited[N - 1][M - 1][1] || -1;
}

console.log(solution(N, M, matrix));
