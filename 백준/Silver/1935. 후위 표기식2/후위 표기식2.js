let fs = require('fs');
let [N, expression, ...operands] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');
N = +N;
expression = expression.split('');
operands = operands.map((v) => +v);

function solution() {
  const stack = [];

  for (let i = 0; i < expression.length; i++) {
    if (['+', '-', '*', '/'].includes(expression[i])) {
      let a = stack.pop();
      let b = stack.pop();
      switch (expression[i]) {
        case '+':
          stack.push(b + a);
          break;
        case '-':
          stack.push(b - a);
          break;
        case '*':
          stack.push(b * a);
          break;
        case '/':
          stack.push(b / a);
          break;
      }
    } else {
      stack.push(operands[expression[i].charCodeAt() - 65]);
    }
  }

  return stack[0].toFixed(2);
}

console.log(solution());
