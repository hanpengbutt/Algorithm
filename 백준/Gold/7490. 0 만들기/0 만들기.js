let fs = require('fs');
let [T, ...input] = fs
  .readFileSync(0, 'utf8')
  .split('\n')
  .map(Number);

function solution(N) {
  const nums = new Array(N).fill(0).map((_, i) => i + 1);
  const operators = [];
  const result = [];

  function select(idx, selected) {
    if (idx === N - 1) {
      operators.push(selected);
      return;
    }

    select(idx + 1, [...selected, ' ']);
    select(idx + 1, [...selected, '+']);
    select(idx + 1, [...selected, '-']);
  }

  select(0, []);

  operators.forEach((operator) => {
    let operand_stack = [];
    let operator_stack = [];

    for (let i = 0; i < 2 * N - 1; i++) {
      if (i % 2 === 0) {
        // 숫자인 경우
        const num = nums[i / 2];

        if (operator_stack[operator_stack.length - 1] === ' ') {
          // 이전 연산자가 공백인 경우
          operator_stack.pop();
          operand_stack.push(+`${operand_stack.pop()}${num}`);
        } else {
          operand_stack.push(num);
        }
      } else {
        // 연산자인 경우
        const op = operator[(i - 1) / 2];

        if (operator_stack.length > 0 && (op === '+' || op === '-')) {
          const b = operand_stack.pop();
          const a = operand_stack.pop();
          const o = operator_stack.pop();

          if (o === '+') {
            operand_stack.push(a + b);
          } else {
            operand_stack.push(a - b);
          }
        }

        operator_stack.push(op);
      }
    }

    if (operand_stack.length === 1) {
      if (operand_stack[0] === 0) result.push(operator);
    } else {
      let count = 0;
      const b = operand_stack.pop();
      const a = operand_stack.pop();
      const o = operator_stack.pop();

      if (o === '+') {
        count = a + b;
      } else {
        count = a - b;
      }

      if (count === 0) result.push(operator);
    }
  });

  function convertResult(operator) {
    const result = [];
    for (let i = 0; i < 2 * N - 1; i++) {
      if (i % 2 === 0) {
        result.push(nums[i / 2]);
      } else {
        result.push(operator[(i - 1) / 2]);
      }
    }

    return result.join('');
  }

  return result.map((r) => convertResult(r)).join('\n')
}

for (let i = 0; i < T; i++) {
  console.log(solution(input[i]));
  if (i < T - 1) console.log('');
}
