let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const jewels = input.slice(1).map(Number);

function solution(N, M, jewels) {
  function isPossible(n) {
    let count = 0;
    for (let i = 0; i < jewels.length; i++) {
      count += Math.ceil(jewels[i] / n);
    }

    if (count <= N) {
      return true;
    } else {
      return false;
    }
  }

  jewels.sort((a, b) => b - a);
  let result = 0;

  let left = 1;
  let right = jewels[0];

  while (left <= right) {
    let mid = ~~((left + right) / 2);

    if (isPossible(mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
}

console.log(solution(N, M, jewels));