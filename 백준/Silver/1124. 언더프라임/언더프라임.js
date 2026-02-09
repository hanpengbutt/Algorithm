const fs = require('fs');
const [A, B] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map((v) => +v);

function solution(A, B) {
  let result = 0;

  const isPrimeNum = new Array(B + 1).fill(1);
  isPrimeNum[0] = 0;
  isPrimeNum[1] = 0;

  for (let i = 2; i <= Math.sqrt(B); i++) {
    for (let j = 2; i * j <= B; j++) {
      isPrimeNum[i * j] = 0;
    }
  }

  function getPrimeCount(num) {
    let count = 0;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      while (num % i === 0) {
        count++;
        num /= i;
      }
    }

    if (num > 1) count++;

    return count;
  }

  for (let num = A; num <= B; num++) {
    if (!isPrimeNum[num] && isPrimeNum[getPrimeCount(num)]) {
      result++;
    }
  }

  return result;
}

console.log(solution(A, B));
