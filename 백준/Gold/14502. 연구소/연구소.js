let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, matrix) {
  let wallCount = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] === 1) wallCount += 1;
    }
  }
  const walls = [];
  let result = 0;

  function select(idx, selected) {
    if (idx === N * M) {
      if (selected.length === 3) walls.push(selected);
      return;
    }

    if (selected.length > 3) return;

    const row = ~~(idx / M);
    const col = idx % M;

    select(idx + 1, [...selected]);

    if (matrix[row][col] === 0) {
      select(idx + 1, [...selected, idx]);
    }
  }

  function spread(wall) {
    let virusCount = 0;
    const visited = new Array(N).fill(0).map(() => new Array(M).fill(0));
    const vector = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    function bfs(row, col) {
      visited[row][col] = 1;
      const q = [[row, col]];

      while (q.length > 0) {
        const [nowRow, nowCol] = q.shift();
        vector.forEach((v) => {
          const nextRow = nowRow + v[0];
          const nextCol = nowCol + v[1];

          if (
            -1 < nextRow &&
            nextRow < N &&
            -1 < nextCol &&
            nextCol < M &&
            !visited[nextRow][nextCol] &&
            matrix[nextRow][nextCol] === 0 &&
            !wall.includes(nextRow * M + nextCol)
          ) {
            visited[nextRow][nextCol] = 1;
            q.push([nextRow, nextCol]);
            virusCount += 1;
          }
        });
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        {
          if (matrix[i][j] === 2 && !visited[i][j]) {
            bfs(i, j);
            virusCount += 1;
          }
        }
      }
    }

    return N * M - (virusCount + wallCount + 3);
  }

  select(0, []);

  walls.forEach((wall) => {
    const safeCount = spread(wall);
    if (safeCount > result) result = safeCount;
  });

  return result;
}

console.log(solution(N, M, matrix));
