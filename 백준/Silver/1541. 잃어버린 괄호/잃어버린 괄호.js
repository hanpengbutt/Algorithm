let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim();

function solution(input) {
  return input
    .split('-')
    .map((vals) =>
      vals
        .split('+')
        .map((v) => +v)
        .reduce((acc, cur) => (acc += cur))
    )
    .reduce((acc, cur) => (acc -= cur));
}

console.log(solution(input));
