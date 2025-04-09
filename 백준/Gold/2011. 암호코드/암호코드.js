let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('').map(Number);

function solution(input) {
  let words = new Map();

  if (0 < input[0]) {
    words.set(input[0], 1n);
  } else {
    return 0;
  }

  for (let i = 1; i < input.length; i++) {
    const newWords = new Map();
    for (let [str, count] of words) {
      if (0 < input[i]) {
        newWords.set(input[i], (newWords.get(input[i]) || 0n) + count);
      }
      const num = +`${str}${input[i]}`;
      if (0 < num && num < 27) {
        newWords.set(num, (newWords.get(num) || 0n) + count);
      }
    }
    if (newWords.size === 0) return 0;
    words = newWords;
  }

  return ([...words.values()].reduce((acc, cur) => (acc += cur)) % 1000000n).toString();
}

console.log(solution(input));
