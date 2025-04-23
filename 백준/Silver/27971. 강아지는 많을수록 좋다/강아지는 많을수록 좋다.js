let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let [N, M, A, B] = input[0].split(' ').map(Number);
const intervals = input
  .slice(1)
  .map((interval) => interval.split(' ').map(Number));

function solution(N, M, A, B, intervals) {
  const dp = new Array(N + 1).fill(0);
  for (let i = 0; i < M; i++) {
    const [start, end] = intervals[i];
    for (let j = start; j <= end; j++) {
      dp[j] = -1;
    }
  }

  if(dp[A] !== -1) dp[A] = 1
  if(dp[B] !== -1) dp[B] = 1

  for (let i = 1; i <= N; i++) {
    if (dp[i] === 0) {
      const options = [];
      if (i - A > 0 && dp[i - A] > 0) {
        options.push(dp[i - A]);
      }
      if (i - B > 0 && dp[i - B] > 0) {
        options.push(dp[i - B]);
      }
      if(options.length) dp[i] = Math.min(...options) + 1
    }
  }

  return dp[N] ? dp[N] : -1
}

console.log(solution(N, M, A, B, intervals));
