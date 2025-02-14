let fs = require('fs');
let input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, S] = input[0].split(' ').map((v) => +v);
const nums = input[1].split(' ').map((v) => +v);

const solution = (N, S, nums) => {
  let result = 0;

  function add(idx, sum) {
    if (idx === N) {
      if (sum === S) result += 1;
      return;
    }

    add(idx + 1, sum);
    add(idx + 1, sum + nums[idx]);
  }

  add(0, 0);

  return S === 0 ? result - 1 : result;
};

console.log(solution(N, S, nums));