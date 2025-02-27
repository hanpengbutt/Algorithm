let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const nums = input[1].split(' ').map((v) => +v);
const sections = input.slice(2).map((s) => s.split(' ').map((v) => +v));

function solution(N, M, nums, sections) {
  const result = [];
  const dp = new Array(N);
  dp[0] = nums[0];

  for (let i = 1; i < N; i++) {
    dp[i] = dp[i - 1] + nums[i];
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = sections[i];
    if (start === 1) {
      result.push(dp[end - 1]);
    } else {
      result.push(dp[end - 1] - dp[start - 2]);
    }
  }

  return result.join('\n').trim()
}

console.log(solution(N, M, nums, sections));