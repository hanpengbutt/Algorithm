const fs = require('fs');
const matrix = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.split(''));

function solution(matrix) {
  let result = 0;

  function fall() {
    for (let col = 0; col < 6; col++) {
      const queue = [];
      let idx = 0;
      for (let row = 11; row > -1; row--) {
        if (matrix[row][col] !== '.') queue.push(matrix[row][col]);
      }
      for (let row = 11; row > -1; row--) {
        if (idx < queue.length) {
          matrix[row][col] = queue[idx++];
        } else {
          matrix[row][col] = '.';
        }
      }
    }
  }

  function bfs(start_row, start_col, color, visited) {
    const queue = [[start_row, start_col]];
    let idx = 0;
    visited[start_row][start_col] = 1;
    const vector = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (idx < queue.length) {
      const [now_row, now_col] = queue[idx++];
      vector.forEach(([dr, dc]) => {
        const next_row = now_row + dr;
        const next_col = now_col + dc;

        if (
          -1 < next_row &&
          next_row < 12 &&
          -1 < next_col &&
          next_col < 6 &&
          matrix[next_row][next_col] === color &&
          !visited[next_row][next_col]
        ) {
          visited[next_row][next_col] = 1;
          queue.push([next_row, next_col]);
        }
      });
    }

    return queue;
  }

  fall();

  while (1) {
    let flag = 0;
    const visited = new Array(12).fill(0).map(() => new Array(6).fill(0));

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 6; col++) {
        if (!visited[row][col] && matrix[row][col] !== '.') {
          const component = bfs(row, col, matrix[row][col], visited);
          if (component.length > 3) {
            flag = 1;
            component.forEach(([r, c]) => {
              matrix[r][c] = '.';
            });
          }
        }
      }
    }

    if (flag === 0) break;
    result += 1;
    fall();
  }

  return result;
}

console.log(solution(matrix));
