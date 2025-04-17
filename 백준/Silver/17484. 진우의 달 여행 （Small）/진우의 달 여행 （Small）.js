let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, matrix) {
  let result = Infinity;

  function select(row, col, sum, dir) {
    if (row === N) {
      if (sum < result) result = sum;
      return;
    }

    let newRow = row + 1;
    let newCol = col + dir;
    if (newCol <= -1 || newCol >= M) return;

    for (let newDir = -1; newDir <= 1; newDir++) {
      if (dir !== newDir)
        select(newRow, newCol, sum + matrix[row][col], newDir);
    }
  }

  for (let col = 0; col < M; col++) {
    for (let dir = -1; dir <= 1; dir++) {
      select(0, col, 0, dir);
    }
  }

  return result;
}

console.log(solution(N, M, matrix));
