let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [K, N] = input[0].split(' ').map(Number);
const lens = input.slice(1).map(Number);

function solution(K, N, lens) {
  let left = 1;
  let right = Math.max(...lens);

  while (left <= right) {
    let mid = ~~((left + right) / 2);
    let count = 0;
    lens.forEach((len) => {
      count += ~~(len / mid);
    });

    if (count >= N) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

console.log(solution(K, N, lens));
