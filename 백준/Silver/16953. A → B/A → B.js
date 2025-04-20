let fs = require('fs');
let [A, B] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

function solution(A, B) {
  let result = -1;
  function calc(num, count) {
    if (num === A) {
      result = count;
      return count;
    } else if (num < A) {
      return;
    }

    const numToStr = num.toString();
    if (numToStr[numToStr.length - 1] === '1')
      calc(+numToStr.slice(0, -1), count + 1);

    if (num % 2 === 0) calc(num / 2, count + 1);
  }

  calc(B, 1);

  return result;
}

console.log(solution(A, B));
