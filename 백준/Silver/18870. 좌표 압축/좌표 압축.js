let fs = require('fs');
let [N, x] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
x = x.split(' ').map(Number);

function solution(N, x) {
  const result = [];
  const sortedX = [...new Set(x)].sort((a, b) => a - b);

  function find(val) {
    let left = 0;
    let right = sortedX.length - 1;
    let mid = Math.floor(left + (right - left) / 2);

    while (sortedX[mid] !== val) {
      if (sortedX[mid] < val) {
        left = mid + 1;
      } else if (sortedX[mid] > val) {
        right = mid - 1;
      }
      mid = Math.floor(left + (right - left) / 2);
    }

    return mid;
  }

  for (let i = 0; i < N; i++) {
    result.push(find(x[i]));
  }

  return result.join(' ').trim();
}

console.log(solution(N, x));
