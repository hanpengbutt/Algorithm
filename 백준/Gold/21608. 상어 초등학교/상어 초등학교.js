let fs = require('fs');
let [N, ...table] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
table = table.map((row) => row.split(' ').map(Number));

function solution(N, table) {
  let result = 0;
  const s_map = new Map();
  const matrix = new Array(N).fill(0).map(() => new Array(N).fill(0));
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  table.forEach((line) => {
    const student = line[0];
    const likes = line.slice(1);
    s_map.set(student, likes);

    let weigth = 0;
    let idx = [];

    matrix.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        let w = 0;
        if (val === 0) {
          vector.forEach((v) => {
            const [dr, dc] = v;
            if (
              -1 < rowIdx + dr &&
              rowIdx + dr < N &&
              -1 < colIdx + dc &&
              colIdx + dc < N
            ) {
              if (matrix[rowIdx + dr][colIdx + dc] === 0) {
                w += 1;
              } else if (likes.includes(matrix[rowIdx + dr][colIdx + dc])) {
                w += 10;
              }
            }
          });

          if (idx.length === 0 || weigth < w) {
            weigth = w;
            idx = [rowIdx, colIdx];
          }
        }
      });
    });

    matrix[idx[0]][idx[1]] = student;
  });

  matrix.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      const likes = s_map.get(val);
      let count = 0;
      vector.forEach((v) => {
        const [dr, dc] = v;
        if (
          -1 < rowIdx + dr &&
          rowIdx + dr < N &&
          -1 < colIdx + dc &&
          colIdx + dc < N &&
          likes.includes(matrix[rowIdx + dr][colIdx + dc])
        ) {
          count += 1;
        }
      });

      result += count === 0 ? 0 : 10 ** (count - 1);
    });
  });

  return result
}

console.log(solution(N, table));
