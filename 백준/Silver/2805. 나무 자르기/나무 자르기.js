let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const trees = input[1].split(' ').map(Number);

function solution(N, M, trees) {
  function isPossible(height) {
    return (
      trees.map((tree) => tree - height > 0 ? tree - height : 0).reduce((acc, cur) => (acc += cur)) >= M
    );
  }

  let left = 0;
  let right = Math.max(...trees);
  let mid = ~~((left + right) / 2);

  while (left <= right) {
    if (isPossible(mid)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = ~~((left + right) / 2);
  }

  return mid;
}

console.log(solution(N, M, trees));
