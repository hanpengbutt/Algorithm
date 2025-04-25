let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row, rowIdx) =>
  row
    .split(' ')
    .map((v, colIdx) =>
      (rowIdx % 2 === 0 && colIdx % 2 === 0) ||
      (rowIdx % 2 !== 0 && colIdx % 2 !== 0)
        ? +v
        : v
    )
);

function solution(N, matrix) {
  const vector = [
    [1, 0],
    [0, 1],
  ];
  const dp = new Array(N)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => [-Infinity, Infinity]));

  dp[0][0][0] = dp[0][0][1] = matrix[0][0];

  function calc(a, b, op) {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
    }
  }

  for (let i = 0; i < N - 1; i++) {
    for (let row = 0; row <= i * 2; row++) {
      const col = i * 2 - row;

      if (row < N && -1 < col && col < N) {
        const a_max = dp[row][col][0];
        const a_min = dp[row][col][1];

        vector.forEach((v1) => {
          const [dr1, dc1] = v1;
          if (row + dr1 < N && col + dc1 < N) {
            const op = matrix[row + dr1][col + dc1];

            vector.forEach((v2) => {
              const [dr2, dc2] = v2;
              if (row + dr1 + dr2 < N && col + dc1 + dc2 < N) {
                const b = matrix[row + dr1 + dr2][col + dc1 + dc2];

                const result_max = calc(a_max, b, op);
                const result_min = calc(a_min, b, op);

                if (dp[row + dr1 + dr2][col + dc1 + dc2][0] < result_max)
                  dp[row + dr1 + dr2][col + dc1 + dc2][0] = result_max;
                if (result_min < dp[row + dr1 + dr2][col + dc1 + dc2][1])
                  dp[row + dr1 + dr2][col + dc1 + dc2][1] = result_min;
              }
            });
          }
        });
      }
    }
  }

  return dp[N - 1][N - 1].join(' ');
}

console.log(solution(N, matrix));
