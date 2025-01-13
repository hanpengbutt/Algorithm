let fs = require('fs');
let [N, ...buildings] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v);

function solution() {
  const stack = [];
  let result = 0;

  for (let i = N - 1; i > -1; i--) {
    while (stack.length && buildings[stack[stack.length - 1]] < buildings[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result += N - i - 1;
    } else {
      result += stack[stack.length - 1] - i - 1;
    }

    stack.push(i);
  }
  return result;
}

console.log(solution());
