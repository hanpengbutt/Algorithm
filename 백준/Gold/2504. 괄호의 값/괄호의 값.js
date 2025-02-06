let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('');

function solution(input) {
  const stack = [];

  for (let i = 0; i < input.length; i++) {
    const now = input[i];

    if (['(', '['].includes(now)) {
      // 입력이 여는 괄호인 경우
      stack.push(now);
    } else {
      // 입력이 닫는 괄호인 경우
      if (stack.length === 0) return 0;
      let nums = 0;
      let top = stack.pop();
      while (stack.length >= 0 && typeof top === 'number') {
        nums += top;
        top = stack.pop();
      }

      if (typeof top === 'number') return 0;

      if (top === '(' && now === ')') {
        // 괄호 쌍이 ()로  맞는 경우
        if (nums === 0) {
          stack.push(2);
        } else {
          stack.push(nums * 2);
        }
      } else if (top === '[' && now === ']') {
        // 괄호 쌍이 []로  맞는 경우
        if (nums === 0) {
          stack.push(3);
        } else {
          stack.push(nums * 3);
        }
      } else {
        return 0;
      }
    }
  }

  let result = stack.reduce((acc, cur) => (acc += cur));
  return typeof result === 'number' ? result : 0;
}

console.log(solution(input));
