function isCorrect(pares) {
  const stack = [];

  for (let i = 0; i < pares.length; i++) {
    const pare = pares[i];

    if (pare === '(' || pare === '[' || pare === '{') {
      // 여는 괄호일 경우 push
      stack.push(pare);
    } else {
      // 닫는 괄호일 경우 pop
      if (stack.length === 0) {
        // 스택이 이미 비었을 경우
        return false;
      } else {
        const popItem = stack.pop();
        if (
          (pare === ')' && popItem !== '(') ||
          (pare === '}' && popItem !== '{') ||
          (pare === ']' && popItem !== '[')
        ) {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
}

function solution(s) {
  let result = 0;
  const pares = s.split('');

  for (let i = 0; i < pares.length; i++) {
    if (isCorrect(pares.slice(i + 1).concat(pares.slice(0, i + 1)))) {
      result += 1;
    }
  }

  return result;
}