let fs = require('fs');
let [N, A, B] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
A = A.split(' ').map(Number);
B = B.split(' ').map(Number);

function solution(N, A, B) {
  let result = 0;

  A.sort((a, b) => b - a);
  B.sort((a, b) => a - b);

  for (let i = 0; i < N; i++) {
    result += A[i] * B[i];
  }

  return result;
}

console.log(solution(N, A, B));
