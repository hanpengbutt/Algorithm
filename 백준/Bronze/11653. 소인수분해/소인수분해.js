let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const result = [];

  while (N % 2 === 0) {
    result.push(2);
    N /= 2;
  }

  for (let i = 3; i * i <= N; i += 2) {
    while (N % i === 0) {
      result.push(i);
      N /= i;
    }
  }

  if (N > 1) result.push(N);

  return result.join('\n').trim();
}

console.log(solution(N));
