let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(input) {
  const [H, W] = input[0].split(' ').map(Number);
  const matrix = new Array(H).fill(0).map(() => new Array(W).fill(0));
  const waters = input[1].split(' ').map(Number);

  waters.forEach((water, col) => {
    for (let row = H - 1; row >= H - water; row--) {
      matrix[row][col] = 1;
    }
  });

  let result = (isStart = count = 0);

  for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
      if (matrix[row][col] === 1) {
        // 블록이 있는 곳이라면
        if (isStart === 0) {
          // 시작 블록이 없는 경우
          isStart = 1;
        } else {
          // 시작 블록이 있는 경우
          result += count;
          count = 0;
        }
      } else {
        // 블록이 없는 곳이라면
        if (isStart === 1) count += 1;
      }
    }
    isStart = 0;
    count = 0;
  }

  return result;
}

console.log(solution(input));