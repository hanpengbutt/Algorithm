let fs = require('fs');
let [N, arr] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
arr = arr.split(' ').map((v) => +v);

function solution() {
  const stack = [];
  const result = new Array(N).fill(0);

  for (let i = N - 1; i > -1; i--) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = -1;
    } else {
      result[i] = stack[stack.length - 1];
    }

    stack.push(arr[i]);
  }

  return result.join(' ');
}

console.log(solution());