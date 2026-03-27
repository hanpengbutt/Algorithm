const fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map((v) => +v));

function solution(N, matrix) {
  const result = [0, 0];
  matrix.forEach((row) => {
    row.forEach((v) => {
      if (v === 0) {
        result[0] += 1;
      } else {
        result[1] += 1;
      }
    });
  });

  const vector = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  let composite = matrix;

  for (let i = 2; i <= N; i *= 2) {
    const newComposite = new Array(N / i)
      .fill(0)
      .map(() => new Array(N / i).fill(-1));

    for (let row = 0; row < composite.length; row += 2) {
      for (let col = 0; col < composite.length; col += 2) {
        const set = new Set(
          vector.map(([dr, dc]) => composite[row + dr][col + dc]),
        );

        if (set.size === 1) {
          if (set.has(0)) {
            result[0] -= 3;
            newComposite[row / 2][col / 2] = 0;
          } else if (set.has(1)) {
            result[1] -= 3;
            newComposite[row / 2][col / 2] = 1;
          }
        }
      }
    }
    composite = newComposite;
  }
  return result.join('\n');
}

console.log(solution(N, matrix));
