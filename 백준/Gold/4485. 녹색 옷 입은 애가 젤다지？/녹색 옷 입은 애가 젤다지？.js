let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const vector = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
function solution(N, matrix) {
  const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
  const rupees = new Array(N).fill(0).map(() => new Array(N).fill(0));
  const q = [];

  visited[0][0] = 1;
  rupees[0][0] = matrix[0][0];
  q.push([0, 0]);

  while (q.length !== 0) {
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
        (!visited[next_row][next_col] ||
          rupees[now_row][now_col] + matrix[next_row][next_col] <
            rupees[next_row][next_col])
      ) {
        q.push([next_row, next_col]);
        visited[next_row][next_col] = 1;
        rupees[next_row][next_col] =
        rupees[now_row][now_col] + matrix[next_row][next_col];
      }
    });
  }

  return rupees[N - 1][N - 1];
}

let idx = 1;
let i = 0;
while (input[i] !== '0') {
  const N = +input[i];
  const matrix = input
    .slice(i + 1, i + N + 1)
    .map((row) => row.split(' ').map(Number));

  const result = solution(N, matrix);
  console.log(`Problem ${idx}: ${result}`);

  idx += 1;
  i += N + 1;
}