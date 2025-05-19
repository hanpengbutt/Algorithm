let fs = require('fs');
const N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  if (N < 100) return N;

  const nums = [];
  let result = 99;

  for (let i = 100; i < 1001; i++) {
    const str = i.toString();
    let flag = true;
    let diff = +str[1] - +str[0];

    for (let j = 1; j < str.length - 1; j++) {
      if (diff !== +str[j + 1] - +str[j]) {
        flag = false;
        break;
      }
    }

    if (flag) nums.push(i);
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > N) break;
    result++;
  }

  return result;
}

console.log(solution(N));
