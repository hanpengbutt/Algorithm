let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map(Number));

function solution(N, matrix) {
  let result = 1;
  const vector = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let max = Math.max(...matrix.map((row) => Math.max(...row)));

  function bfs(row, col, water, visited) {
    visited[row][col] = 1;
    const q = [[row, col]];

    while (q.length) {
      const [now_row, now_col] = q.shift();

      vector.forEach((v) => {
        const [dr, dc] = v;
        const next_row = now_row + dr;
        const next_col = now_col + dc;

        if (
          -1 < next_row &&
          next_row < N &&
          -1 < next_col &&
          next_col < N &&
          matrix[next_row][next_col] > water &&
          !visited[next_row][next_col]
        ) {
          visited[next_row][next_col] = 1;
          q.push([next_row, next_col]);
        }
      });
    }
  }

  for (let water = 1; water < max; water++) {
    const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
    let count = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (matrix[row][col] > water && !visited[row][col]) {
          bfs(row, col, water, visited);
          count += 1;
        }
      }
    }
    if (count > result) result = count;
  }

  return result
}

console.log(solution(N, matrix));
