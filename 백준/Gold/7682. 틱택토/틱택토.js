let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(matrix) {
  let first = 0;
  let second = 0;

  for (let i = 0; i < 9; i++) {
    const v = matrix[i];
    if (v === 'X') first += 1;
    if (v === 'O') second += 1;
  }

  if (first !== second && first !== second + 1) {
    return 'invalid';
  }

  const success = [];

  function isSuccess(line) {
    if (new Set(line).size === 1 && line[0] !== '.') {
      success.push(line[0]);
    }
  }

  for (let i = 0; i < 3; i += 1) {
    const line = [];
    for (let j = 0; j < 3; j += 1) {
      line.push(matrix[i * 3 + j]);
    }
    isSuccess(line);
  }

  for (let i = 0; i < 3; i += 1) {
    const line = [];
    for (let j = 0; j < 3; j += 1) {
      line.push(matrix[i + j * 3]);
    }
    isSuccess(line);
  }

  let line = [];
  for (let i = 0; i < 3; i += 1) {
    line.push(matrix[4 * i]);
  }
  isSuccess(line);

  line = [];
  for (let i = 0; i < 3; i += 1) {
    line.push(matrix[2 + 2 * i]);
  }
  isSuccess(line);

  if (success.length !== 0) {
    if (new Set(success).size !== 1) return 'invalid';
    if (success[0] === 'O' && first !== second) return 'invalid';
    if (success[0] === 'X' && first !== second + 1) return 'invalid';
  } else {
    if (first + second !== 9) {
      return 'invalid';
    }
  }

  return 'valid';
}

for (let i = 0; i < input.length - 1; i++) {
  const matrix = input[i].split('');
  console.log(solution(matrix));
}
