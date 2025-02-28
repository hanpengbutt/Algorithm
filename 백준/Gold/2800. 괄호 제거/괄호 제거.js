let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('');

function solution(input) {
  const result = [];

  // 괄호 쌍의 개수
  const pairCount = input.filter((s) => s === '(').length;

  function deletePairs(idxs) {
    let count = 1
    const stack = [];
    const expression = [...input];
    for (let i = 0; i < input.length; i++) {
      if (expression[i] === '(') {
        stack.push(count);
        if (idxs.includes(count)) expression[i] = '';
        count += 1
      } else if (expression[i] === ')') {
        const idx = stack.pop();
        if (idxs.includes(idx)) expression[i] = '';
      }
    }
    return expression.join('');
  }

  // 2^(괄호 쌍의 개수)의 경우의 수
  for (let i = 1; i < 1 << pairCount; i++) {
    const idxs = [];
    for (let j = 0; j < pairCount; j++) {
      if (i & (1 << j)) {
        idxs.push(j + 1);
      }
    }

    result.push(deletePairs(idxs));
  }


  return [...new Set(result)].sort().join('\n').trim();
}

console.log(solution(input));
