let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, L, matrix) {
  let result = 0;

  for (let row = 0; row < N; row++) {
    let flag = 1;
    let prev = matrix[row][0];
    let count = 1;
    let down = 0;

    for (let col = 1; col < N; col++) {
      const now = matrix[row][col];

      if (now === prev) {
        count++;
      } else if (now === prev + 1) {
        if (!down && count >= L) {
          count = 1;
        } else {
          flag = 0;
          break;
        }
      } else if (now === prev - 1) {
        if (!down) {
          down = 1;
          count = 1;
        } else {
          flag = 0;
          break;
        }
      } else {
        flag = 0;
        break;
      }

      if (down && count === L) {
        down = 0;
        count = 0;
      }

      prev = now;
    }

    if (!down && flag) {
      result++;
    }
  }

  for (let col = 0; col < N; col++) {
    let flag = 1;
    let prev = matrix[0][col];
    let count = 1;
    let down = 0;

    for (let row = 1; row < N; row++) {
      const now = matrix[row][col];

      if (now === prev) {
        count++;
      } else if (now === prev + 1) {
        if (!down && count >= L) {
          count = 1;
        } else {
          flag = 0;
          break;
        }
      } else if (now === prev - 1) {
        if (!down) {
          down = 1;
          count = 1;
        } else {
          flag = 0;
          break;
        }
      } else {
        flag = 0;
        break;
      }

      if (down && count === L) {
        down = 0;
        count = 0;
      }

      prev = now;
    }

    if (!down && flag) {
      result++;
    }
  }

  return result;
}

console.log(solution(N, L, matrix));
