let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const errors = input[1].split(' ').map(Number);
const [X, Y] = input[2].split(' ').map(Number);

function solution(N, M, X, Y, errors) {
  if (X === 0) return M - Y;
    
  const lines = new Array(N).fill(1);
  for (let i = 0; i < M; i++) {
    lines[errors[i] - 1] = 0;
  }

  let correctLineCount = lines.slice(0, X).reduce((acc, cur) => (acc += cur));
  let modifyCount = X - correctLineCount;

  for (let i = X; i < N; i++) {
    correctLineCount = correctLineCount - lines[i - X] + lines[i];
    modifyCount = Math.min(modifyCount, X - correctLineCount);
  }

  return M - Math.max(modifyCount, Y);
}

console.log(solution(N, M, X, Y, errors));
