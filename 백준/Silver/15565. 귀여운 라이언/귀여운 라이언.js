let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const dolls = input[1].split(' ').map(Number);

function solution(N, K, dolls) {
  const idxs = [];
  dolls.forEach((doll, idx) => {
    if (doll === 1) idxs.push(idx);
  });

  if (idxs.length < K) return -1;

  let result = +Infinity;

  let left = 0
  let right = K - 1

  while (right < idxs.length) {
    const sum = idxs[right++] - idxs[left++] + 1;
    if (sum < result) result = sum;
  }

  return result;
}

console.log(solution(N, K, dolls));
