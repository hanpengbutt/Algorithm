const fs = require('fs');
let [N, nums, operators] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

N = +N;
nums = nums.split(' ').map((v) => +v);
operators = operators.split(' ').map((v) => +v);

function solution(N, nums, operators) {
  let max = -Infinity;
  let min = Infinity;

  function calc(perm) {
    const value = nums.reduce((acc, cur, idx) => {
      if (idx > 0) {
        switch (perm[idx - 1]) {
          case 0:
            return acc + cur;
          case 1:
            return acc - cur;
          case 2:
            return acc * cur;
          case 3:
            return ~~(acc / cur);
        }
      } else {
        return acc + cur;
      }
    });

    if (value < min) min = value;
    if (value > max) max = value;
  }

  function backtracking(perm, operators) {
    if (perm.length === N - 1) {
      calc(perm);
      return;
    }

    operators.forEach((operator, idx) => {
      if (operator > 0) {
        let new_operators = [...operators];
        new_operators[idx] -= 1;
        backtracking([...perm, idx], new_operators);
      }
    });
  }

  backtracking([], operators);

  return [max, min].join('\n');
}

console.log(solution(N, nums, operators));
