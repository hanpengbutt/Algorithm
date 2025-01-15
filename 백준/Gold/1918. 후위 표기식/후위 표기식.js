let fs = require('fs');
let expression = fs.readFileSync(0, 'utf8').trim().split('');

function solution() {
  const operandStack = [];
  const operatorStack = [];

  function getPriority(operator) {
    let priority;
    switch (operator) {
      case '+':
        priority = 1;
        break;
      case '-':
        priority = 1;
        break;
      case '*':
        priority = 2;
        break;
      case '/':
        priority = 2;
        break;
      case '(':
        priority = 0;
        break;
    }

    return priority
  }

  for (let i = 0; i < expression.length; i++) {
    switch (expression[i]) {
      case '+':
      case '-':
      case '*':
      case '/':
        while (
          operatorStack.length &&
          getPriority(operatorStack[operatorStack.length - 1]) >=
            getPriority(expression[i])
        ) {
          const a = operandStack.pop();
          const b = operandStack.pop();
          const operator = operatorStack.pop();
          operandStack.push(b + a + operator);
        }
        operatorStack.push(expression[i]);
        break;
      case '(':
        operatorStack.push('(');
        break;
      case ')':
        while (1) {
          const operator = operatorStack.pop();
          if (operator === '(') break;
          const a = operandStack.pop();
          const b = operandStack.pop();
          operandStack.push(b + a + operator);
        }
        break;
      default:
        operandStack.push(expression[i]);
    }
  }

  while (operatorStack.length) {
    const operator = operatorStack.pop();
    const a = operandStack.pop();
    const b = operandStack.pop();
    operandStack.push(b + a + operator);
  }

  return operandStack[0]
}

console.log(solution());
