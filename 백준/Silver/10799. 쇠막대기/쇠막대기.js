let fs = require('fs');
let pares = fs.readFileSync(0, 'utf8').trim().split('');

function solution(pares) {
  let result = 0;
  const stack = [];
  let flag = 1;

  pares.forEach((pare) => {
    if (pare === '(') {
      // 왼쪽 괄호
      stack.push('(');
      flag = 1;
    } else {
      // 오른쪽 괄호
      stack.pop();
      if (flag) {
        // 이전이 왼쪽 괄호인 경우
        result += stack.length;
      } else {
        // 이전이 왼쪽 괄호가 아닌 경우
        result += 1;
      }
      flag = 0;
    }
  });

  return result;
}

console.log(solution(pares));
