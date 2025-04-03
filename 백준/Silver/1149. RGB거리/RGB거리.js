let fs = require('fs');
let [N, ...costs] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
costs = costs.map((home) => home.split(' ').map(Number));

function solution(N, costs) {
  const dp = new Array(N + 1).fill(0).map(() => new Array(3).fill(0));

  dp[1][0] = costs[0][0];
  dp[1][1] = costs[0][1];
  dp[1][2] = costs[0][2];

  for (let i = 1; i <= N; i++) {
    // i번 째 집
    for (let j = 0; j < 3; j++) {
      // i번 째 집이 j색(0-R, 1-G, 2-B)일 때 집을 칠하는 비용의 최솟값
      let values = [dp[i - 1][1], dp[i - 1][2]];
      if (j === 1) {
        values = [dp[i - 1][0], dp[i - 1][2]];
      } else if (j === 2) {
        values = [dp[i - 1][0], dp[i - 1][1]];
      }

      dp[i][j] = Math.min(...values) + costs[i - 1][j];
    }
  }

  return Math.min(...dp[N]);
}

console.log(solution(N, costs));
