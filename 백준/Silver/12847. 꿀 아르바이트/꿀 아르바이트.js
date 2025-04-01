let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const T = input[1].split(' ').map(Number);

function solution(n, m, T) {
  const psum = new Array(n).fill(0);

  psum[0] = T[0];
  for (let i = 1; i < n; i++) {
    psum[i] = psum[i - 1] + T[i];
  }

  let result = psum[m - 1];
  for (let i = m; i < n; i++) {
    const sum = psum[i] - psum[i - m];
    if (sum > result) result = sum;
  }

  return result;
}

console.log(solution(n, m, T));
