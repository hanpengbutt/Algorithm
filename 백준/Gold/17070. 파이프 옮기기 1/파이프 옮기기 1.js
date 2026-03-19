const fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map((v) => +v));

function solution(N, matrix) {
  let result = 0;
  let nows = [];
  const visited = new Array(N)
    .fill(0)
    .map(() =>
      new Array(N).fill(0).map(() => new Array(3).fill(0).map(() => [])),
    );

  if (!matrix[N - 1][N - 1]) {
    if (!matrix[N - 1][N - 2]) {
      nows.push([N - 1, N - 2, 0]);
      visited[N - 1][N - 2][0] = 1;
    }

    if (!matrix[N - 2][N - 1]) {
      nows.push([N - 2, N - 1, 1]);
      visited[N - 2][N - 1][1] = 1;
    }

    if (
      !matrix[N - 1][N - 2] &&
      !matrix[N - 2][N - 1] &&
      !matrix[N - 2][N - 2]
    ) {
      nows.push([N - 2, N - 2, 2]);
      visited[N - 2][N - 2][2] = 1;
    }
  }

  while (nows.length) {
    let nexts = [];
    nows.forEach((now) => {
      const [r, c, d] = now;
      switch (d) {
        case 0:
          if (c - 1 > -1 && !matrix[r][c - 1]) {
            if (!visited[r][c - 1][0].length) {
              nexts.push([r, c - 1, 0]);
            }
            visited[r][c - 1][0].push([r, c, d]);

            if (r - 1 > -1 && !matrix[r - 1][c] && !matrix[r - 1][c - 1]) {
              if (!visited[r - 1][c - 1][2].length) {
                nexts.push([r - 1, c - 1, 2]);
              }
              visited[r - 1][c - 1][2].push([r, c, d]);
            }
          }
          break;
        case 1:
          if (r - 1 > -1 && !matrix[r - 1][c]) {
            if (!visited[r - 1][c][1].length) {
              nexts.push([r - 1, c, 1]);
            }
            visited[r - 1][c][1].push([r, c, d]);

            if (c - 1 > -1 && !matrix[r][c - 1] && !matrix[r - 1][c - 1]) {
              if (!visited[r - 1][c - 1][2].length) {
                nexts.push([r - 1, c - 1, 2]);
              }
              visited[r - 1][c - 1][2].push([r, c, d]);
            }
          }
          break;
        case 2:
          if (c - 1 > -1 && !matrix[r][c - 1]) {
            if (!visited[r][c - 1][0].length) {
              nexts.push([r, c - 1, 0]);
            }
            visited[r][c - 1][0].push([r, c, d]);
          }

          if (r - 1 > -1 && !matrix[r - 1][c]) {
            if (!visited[r - 1][c][1].length) {
              nexts.push([r - 1, c, 1]);
            }
            visited[r - 1][c][1].push([r, c, d]);
          }

          if (
            r - 1 > -1 &&
            c - 1 > -1 &&
            !matrix[r][c - 1] &&
            !matrix[r - 1][c] &&
            !matrix[r - 1][c - 1]
          ) {
            if (!visited[r - 1][c - 1][2].length) {
              nexts.push([r - 1, c - 1, 2]);
            }
            visited[r - 1][c - 1][2].push([r, c, d]);
          }
          break;
      }
    });
    nows = nexts;
  }

  function getCount(r, c, d) {
    const nexts = visited[r][c][d];
    if (visited[r][c][d] === 1) {
      result++;
      return;
    }

    nexts.forEach((v) => {
      getCount(v[0], v[1], v[2]);
    });
  }

  visited[0][0][0].forEach((v) => {
    getCount(v[0], v[1], v[2]);
  });

  return result;
}

console.log(solution(N, matrix));
