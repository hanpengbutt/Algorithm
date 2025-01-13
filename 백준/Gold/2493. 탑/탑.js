let fs = require('fs');
let [N, tops] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
tops = tops.split(' ').map((v) => +v);

function solution() {
  const stack = [];
  const result = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    while (stack.length && tops[stack[stack.length - 1] - 1] < tops[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = 0;
    } else {
      result[i] = stack[stack.length - 1];
    }

    stack.push(i + 1);
  }

  return result.join(' ');
}

console.log(solution());
