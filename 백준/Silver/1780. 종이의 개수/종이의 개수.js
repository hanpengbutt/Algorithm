const fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map((v) => +v));

const result = [0, 0, 0];

function getCount(matrix) {
  let [a, b, c] = [0, 0, 0];

  matrix.forEach((row) => {
    row.forEach((v) => {
      if (v === -1) {
        a += 1;
      } else if (v === 0) {
        b += 1;
      } else {
        c += 1;
      }
    });
  });

  let result = 3;

  if (b === 0 && c === 0) {
    result = 0;
  } else if (a === 0 && c === 0) {
    result = 1;
  } else if (a === 0 && b === 0) {
    result = 2;
  }

  return result;
}

function rect(X, matrix) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const new_matrix = matrix
        .slice((i * X) / 3, ((i + 1) * X) / 3)
        .map((row) => row.slice((j * X) / 3, ((j + 1) * X) / 3));
      const r = getCount(new_matrix);

      if (r !== 3) {
        result[r] += 1;
      } else {
        rect(X / 3, new_matrix);
      }
    }
  }
}

const r = getCount(matrix);
if (r !== 3) {
  result[r] += 1;
} else {
  rect(N, matrix);
}

console.log(result.join('\n'));
