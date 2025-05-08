let fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');
T = +T;

function solution(N, A) {
  const stack = [[], [], []];
  let next = 0;
  const sorted = [...A].sort((a, b) => a - b);
  const nums = new Map();
  for (let i = 0; i < N - 1; i++) {
    nums.set(sorted[i], sorted[i + 1]);
  }
  let openIdx = 0;

  for (let i = 0; i < N; i++) {
    const element = A[i];
    if (element === sorted[next]) {
      next++;
      while (1) {
        let flag = 0;
        for (let j = 0; j < 3; j++) {
          if (j !== openIdx) {
            if (stack[j].length && stack[j][0] === sorted[next]) {
              next += stack[j].length;
              stack[j] = [];
              openIdx = j;
              flag = 1;
            }
          }
        }
        if (!flag) break;
      }
    } else {
      let possibleIdx = openIdx;
      for (let j = 0; j < 3; j++) {
        if (j !== openIdx) {
          if (
            (stack[j].length &&
              nums.get(stack[j][stack[j].length - 1]) === element) ||
            (possibleIdx === openIdx && !stack[j].length)
          )
            possibleIdx = j;
        }
      }
      if (possibleIdx !== openIdx) {
        stack[possibleIdx].push(element);
      } else {
        return 'NO';
      }
    }
  }

  return 'YES';
}

for (let i = 0; i < T; i++) {
  const N = +input[2 * i];
  const A = input[2 * i + 1].split(' ').map(Number);
  console.log(solution(N, A));
}
