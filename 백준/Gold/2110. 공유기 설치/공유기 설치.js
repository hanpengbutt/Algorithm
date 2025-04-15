let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const x = input.slice(1).map(Number);

function solution(N, C, x) {
  function isPossible(distance) {
    let count = 1; // 선택된 집 개수, 초기 첫 번째 집 선택
    let next = x[0] + distance; // 다음 집 최소 좌표

    for(let i = 0; i < N; i++) {
      const v = x[i]
      if (v >= next) {
        count += 1;
        next = v + distance;
      }

      if (count === C) return true;
    }

    return false;
  }

  x.sort((a, b) => a - b);

  let left = 1;
  let right = x[N - 1] - x[0];
  let mid = ~~((left + right) / 2);

  while (left <= right) {
    if (isPossible(mid)) {
      left = mid + 1
    } else {
      right = mid - 1
    }

    mid = ~~((left + right) / 2);
  }

  return mid;
}

console.log(solution(N, C, x));
