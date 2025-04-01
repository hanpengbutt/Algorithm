let fs = require('fs');
let [N, ...scores] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map(Number);

function solution(N, scores) {
  // dp[i][0]: i번째 까지 계단을 오르고, 연속된 계단이 1개일 때 점수의 최댓값
  // dp[i][1]: i번째 까지 계단을 오르고, 연속된 계단이 2개일 때 점수의 최댓값
  const dp = new Array(N + 1).fill(0).map(() => [0, 0]);
  scores.unshift(0);

  dp[1][0] = scores[1];
  if (N >= 2) {
    dp[2][0] = scores[2];
    dp[2][1] = scores[1] + scores[2];
  }
  
  for (let i = 3; i <= N; i++) {
    dp[i][0] = Math.max(dp[i - 2][0], dp[i - 2][1]) + scores[i];
    dp[i][1] = dp[i - 1][0] + scores[i];
  }

  return Math.max(dp[N][0], dp[N][1]);
}

console.log(solution(N, scores));
