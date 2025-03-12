let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, matrix) {
  const chickens = []; // 폐업 전 치킨집 위치
  const selecteds = []; // M개 치킨집이 선택될 수 있는 경우들
  const vector = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  matrix.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === 2) chickens.push(rowIdx * N + colIdx);
    });
  });

  function select(idx, selected) {
    if (idx === chickens.length) {
      if (selected.length === M) selecteds.push(selected);
      return;
    }

    select(idx + 1, [...selected, chickens[idx]]);
    select(idx + 1, selected);
  }

  select(0, []);

  function bfs(row, col, visited) {
    const q = [];

    visited[row][col] = 1;
    q.push([row, col]);

    while (q.length > 0) {
      const [nowRow, nowCol] = q.shift();
      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;
        if (
          -1 < nextRow &&
          nextRow < N &&
          -1 < nextCol &&
          nextCol < N &&
          !visited[nextRow][nextCol]
        ) {
          q.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = visited[nowRow][nowCol] + 1;
        }
      });
    }
  }

  const chickenDists = new Array(selecteds.length).fill(0); // 각 M개 치킨집이 선택될 수 있는 경우에 따른 도시의 치킨 거리
  matrix.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === 1) {
        const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
        bfs(rowIdx, colIdx, visited);
        selecteds.forEach((selected, idx) => {
          let dist = [];
          selected.forEach((s) => {
            const row = ~~(s / N);
            const col = s % N;
            dist.push(visited[row][col] - 1);
          });
          chickenDists[idx] += Math.min(...dist);
        });
      }
    });
  });

  return Math.min(...chickenDists);
}

console.log(solution(N, M, matrix));
