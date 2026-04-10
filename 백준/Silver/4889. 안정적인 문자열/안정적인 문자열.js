const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(input) {
  const result = [];

  input.pop();
  input.forEach((i) => {
    let count = 0;
    const stack = [];
    i.split('').forEach((bracket) => {
      if (bracket === '}' && stack.length && stack[stack.length - 1] === '{') {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    });

    for (let i = 0; i < stack.length - 1; i += 2) {
      if (stack[i] === '}') {
        if (stack[i + 1] === '{') {
          count += 2;
        } else {
          count += 1;
        }
      } else {
        count += 1;
      }
    }

    result.push(count);
  });

  return result.map((v, i) => `${i + 1}. ${v}`).join('\n');
}

console.log(solution(input));
