let fs = require('fs');
let [str, bombStr] = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution() {
  const stack = [];
  const last = bombStr[bombStr.length - 1];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== last) {
      stack.push(str[i]);
    } else {
      if (
        stack.slice(stack.length - bombStr.length + 1).join('') ===
        bombStr.slice(0, -1)
      ) {
        for (let j = 0; j < bombStr.length - 1; j++) {
          stack.pop();
        }
      } else {
        stack.push(str[i])
      }
    }
  }
  return stack.length === 0 ? 'FRULA' : stack.join('');
}

console.log(solution());