let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const moneys = input.slice(1).map(Number);

function solution(N, M, moneys) {
  function isPossible(K) {
    let nowMoney = 0;
    let count = 0;

    for (let i = 0; i < N; i++) {
      const money = moneys[i];
      if (money > nowMoney) {
        count += 1;
        nowMoney = K;
      }
      nowMoney -= money;
      if (count > M) return false;
    }

    return true;
  }

  let left = Math.max(...moneys);
  let right = moneys.reduce((acc, cur) => (acc += cur));
  let mid;

  while (left <= right) {
    mid = ~~((left + right) / 2);

    if (isPossible(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }


  return mid;
}

console.log(solution(N, M, moneys));

