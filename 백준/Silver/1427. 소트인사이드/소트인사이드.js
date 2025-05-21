let fs = require('fs');
const N = fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  return [...N]
    .map(Number)
    .sort((a, b) => b - a)
    .join('');
}

console.log(solution(N));
