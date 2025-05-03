let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const k = +input[0];
const g = input[1].split(' ').map(Number);

function solution(k, g) {
  const result = [];
  function select(idx, selected) {
    const [left, right] = selected;

    if (idx === k) {
      const rightSum = right.length
        ? right.reduce((acc, cur) => (acc += cur))
        : 0;
      const leftSum = left.length ? left.reduce((acc, cur) => (acc += cur)) : 0;

      if (0 < rightSum - leftSum) {
        result.push(rightSum - leftSum);
      }
      return;
    }

    select(idx + 1, [[...left], [...right]]);
    select(idx + 1, [[...left, g[idx]], [...right]]);
    select(idx + 1, [[...left], [...right, g[idx]]]);
  }

  select(0, [[], []]);

  return g.reduce((acc, cur) => (acc += cur)) - new Set(result).size;
}

console.log(solution(k, g));
