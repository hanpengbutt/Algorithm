let fs = require('fs');
let [N, S] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
S = S.split(' ').map((v) => +v);

function solution(N, s) {
  let result = 0;
  let left = (right = 0);
  let slected = [s[0]];
  let count = 1;

  while (right < N) {
    if (slected.length <= 2) {
      // 선택된 과일 종류가 2개보다 작거나 같은 경우, 다음 과일 선택
      if (count > result) result = count;
      right += 1;
      if (!slected.includes(s[right])) {
        slected.push(s[right]);
      }
      count += 1;
    } else  {
      // 선택된 과일 종류가 2개보다 큰 경우, 이전 과일 선택 해제
      slected = [s[right], s[right - 1]];
      left = right - 1;
      count = 2;
      while (s[left - 1] === s[right - 1]) {
        left -= 1;
        count += 1;
      }
    }
  }

  return result;
}

console.log(solution(N, S));