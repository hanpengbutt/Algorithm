let fs = require('fs');
let [S, T] = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(S, T) {
  let cases = [[...T]];
  let len = T.length;

  while (len !== S.length) {
    let newCases = [];
    cases.forEach((c) => {
      if (c[len - 1] === 'A') {
        const newC = [...c]
        newC.pop()
        newCases.push(newC);
      }

      if (c[0] === 'B') {
        newCases.push(c.slice(1).reverse());
      }
    });
    cases = newCases
    len -= 1;
  }

  return cases.map((c) => c.join('')).includes(S) ? 1 : 0
}

console.log(solution(S, T));
