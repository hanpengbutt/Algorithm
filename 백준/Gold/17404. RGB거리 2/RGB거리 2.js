let fs = require('fs');
let [N, ...costs] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
costs = costs.map((cost) => cost.split(' ').map(Number));

function solution(N, costs) {
  // dp[집 번호][집을 칠한 색][1번 집의 색]
  const dp = new Array(N)
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Array(3).fill(0)));

  for (let i = 0; i < 3; i++) {
    dp[0][i][i] = costs[0][i];
  }

  for (let i = 1; i < N - 1; i++) {
    for (let j = 0; j < 3; j++) {
      let arr = [];
      if (dp[i - 1][1][j]) arr.push(dp[i - 1][1][j]);
      if (dp[i - 1][2][j]) arr.push(dp[i - 1][2][j]);
      if (arr.length) dp[i][0][j] = Math.min(...arr) + costs[i][0];
    }

    for (let j = 0; j < 3; j++) {
      let arr = [];
      if (dp[i - 1][0][j]) arr.push(dp[i - 1][0][j]);
      if (dp[i - 1][2][j]) arr.push(dp[i - 1][2][j]);
      if (arr.length) dp[i][1][j] = Math.min(...arr) + costs[i][1];
    }

    for (let j = 0; j < 3; j++) {
      let arr = [];
      if (dp[i - 1][0][j]) arr.push(dp[i - 1][0][j]);
      if (dp[i - 1][1][j]) arr.push(dp[i - 1][1][j]);
      if (arr.length) dp[i][2][j] = Math.min(...arr) + costs[i][2];
    }
  }

  let arr = [];
  if (dp[N - 2][1][1]) arr.push(dp[N - 2][1][1]);
  if (dp[N - 2][2][1]) arr.push(dp[N - 2][2][1]);
  if (arr.length) dp[N - 1][0][1] = Math.min(...arr) + costs[N - 1][0];

  arr = [];
  if (dp[N - 2][1][2]) arr.push(dp[N - 2][1][2]);
  if (dp[N - 2][2][2]) arr.push(dp[N - 2][2][2]);
  if (arr.length) dp[N - 1][0][2] = Math.min(...arr) + costs[N - 1][0];

  arr = [];
  if (dp[N - 2][0][0]) arr.push(dp[N - 2][0][0]);
  if (dp[N - 2][2][0]) arr.push(dp[N - 2][2][0]);
  if (arr.length) dp[N - 1][1][0] = Math.min(...arr) + costs[N - 1][1];

  arr = [];
  if (dp[N - 2][0][2]) arr.push(dp[N - 2][0][2]);
  if (dp[N - 2][2][2]) arr.push(dp[N - 2][2][2]);
  if (arr.length) dp[N - 1][1][2] = Math.min(...arr) + costs[N - 1][1];

  arr = [];
  if (dp[N - 2][0][0]) arr.push(dp[N - 2][0][0]);
  if (dp[N - 2][1][0]) arr.push(dp[N - 2][1][0]);
  if (arr.length) dp[N - 1][2][0] = Math.min(...arr) + costs[N - 1][2];

  arr = [];
  if (dp[N - 2][0][1]) arr.push(dp[N - 2][0][1]);
  if (dp[N - 2][1][1]) arr.push(dp[N - 2][1][1]);
  if (arr.length) dp[N - 1][2][1] = Math.min(...arr) + costs[N - 1][2];


  return Math.min(...dp[N - 1].flat(2).filter((v) => v !== 0));
}

console.log(solution(N, costs));
