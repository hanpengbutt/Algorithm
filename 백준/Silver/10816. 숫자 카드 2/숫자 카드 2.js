let fs = require('fs');
let [N, cards, M, targets] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

N = +N;
cards = cards.split(' ').map(Number);
M = +M;
targets = targets.split(' ').map(Number);

function solution(N, cards, M, targets) {
  cards.sort((a, b) => a - b);
  let result = [];

  targets.forEach((target) => {
    let left = 0;
    let right = N - 1;
    let max = N;
    let min = N;

    while (left <= right) {
      let mid = ~~((left + right) / 2);

      if (cards[mid] >= target) {
        right = mid - 1;
        min = mid;
      } else {
        left = mid + 1;
      }
    }

    left = 0;
    right = N - 1;

    while (left <= right) {
      let mid = ~~((left + right) / 2);

      if (cards[mid] > target) {
        right = mid - 1;
        max = mid;
      } else {
        left = mid + 1;
      }
    }

    result.push(max - min);
  });

  return result.join(' ');
}

console.log(solution(N, cards, M, targets));
