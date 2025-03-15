let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number);
input.pop();

function solution(input) {
  let answer = []
  const max = Math.max(...input) - 3;

  // isPrimeNums[i]: i가 소수인면 1, 아니면 0
  const isPrimeNums = new Array(max + 1).fill(1);

  for (let i = 2; i * i <= max; i += 1) {
    for (let j = 2; i * j <= max; j++) {
      isPrimeNums[i * j] = 0;
    }
  }



  input.forEach((value) => {
    let result = "Goldbach's conjecture is wrong."
    let b = value - 3; // 입력값보다 작은 홀수 중 두번째로 큰 수
    while (!isPrimeNums[b] || !isPrimeNums[value - b]) {
      b -= 2;
    }

    if (b !== 1) {
        result = `${value} = ${value - b} + ${b}`
    }

    answer.push(result)
  });

  return answer.join('\n').trim()
}

console.log(solution(input));
