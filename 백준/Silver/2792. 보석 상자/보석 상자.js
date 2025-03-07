let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const jewels = input.slice(1).map(Number);

function solution(N, M, jewels) {
  let left = 1;
  let right = Math.max(...jewels);
  let mid = Math.floor(left + (right - left) / 2);

  while (left <= right) {
    const studentCount = jewels
      .map((count) => Math.ceil(count / mid))
      .reduce((acc, cur) => (acc += cur));

    if (studentCount <= N) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    mid = Math.floor(left + (right - left) / 2);
  }

  return left;
}

console.log(solution(N, M, jewels));
