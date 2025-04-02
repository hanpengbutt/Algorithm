let fs = require('fs');
let [N, P, Q] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const memo = new Map();
memo.set(0, 1);

function solution(i) {
  let result = memo.get(i);

  if (!result) {
    result = solution(Math.trunc(i / P)) + solution(Math.trunc(i / Q));
    memo.set(i, result);
  }

  return result;
}

console.log(solution(N));
