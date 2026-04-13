const fs = require('fs');
const [T, ...input] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v);

function solution(T, input) {
  const max = Math.max(...input);
  const isPrimeNum = new Array(max + 1).fill(1);
  isPrimeNum[0] = 0;
  isPrimeNum[1] = 0;

  for (let i = 2; i ** 2 <= max; i++) {
    if (isPrimeNum[i]) {
      for (let j = i ** 2; j <= max; j += i) {
        isPrimeNum[j] = 0;
      }
    }
  }

  const result = input
    .map((num) => {
      let count = 0;
      for (let i = 2; i <= num / 2; i++) {
        if (isPrimeNum[i] && isPrimeNum[num - i]) count++;
      }
      return count;
    })
    .join('\n');

  return result;
}

console.log(solution(T, input));
