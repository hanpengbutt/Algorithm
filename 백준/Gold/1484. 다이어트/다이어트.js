let fs = require('fs');
let G = +fs.readFileSync(0, 'utf8').trim();

function solution(G) {
  const result = [];

  let left = 1;
  let right = 2;

  while (left < right) {
    const diff = right ** 2 - left ** 2;
    if (diff > G) {
      left += 1;
    } else if (diff < G) {
      right += 1;
    } else {
      result.push(right);
      right += 1;
    }
  }

  return result.length ? result.join('\n') : -1;
}

console.log(solution(G));
