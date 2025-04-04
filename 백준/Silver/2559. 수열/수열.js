let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let [N, K] = input[0].split(' ').map(Number);
let temps = input[1].split(' ').map(Number);

function solution(N, K, temps) {
  let result = (sum = temps.slice(0, K).reduce((acc, cur) => (acc += cur)));
  let left = 0;
  let right = K;

  while (right !== N) {
    sum = sum + temps[right] - temps[left];
    if (sum > result) result = sum;
    left += 1;
    right += 1;
  }

  return result;
}

console.log(solution(N, K, temps));