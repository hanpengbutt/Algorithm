let fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

T = +T;
input = input.map((v) => +v);

function solution(T, input) {
  const result = [];
  const dp = new Array(10001).fill(0).map(() => new Array(3).fill(0));
  dp[1][0] = 1;
  dp[2][1] = 1;
  dp[3][2] = 1;

  for (let i = 2; i < 10001; i++) {
    dp[i][0] += dp[i - 1][0];

    if (i - 2 > 0) {
      dp[i][1] += dp[i - 2][0];
      dp[i][1] += dp[i - 2][1];
    }

    if (i - 3 > 0) {
      dp[i][2] += dp[i - 3][0];
      dp[i][2] += dp[i - 3][1];
      dp[i][2] += dp[i - 3][2];
    }
  }

  for (let i = 0; i < T; i++) {
    result.push(dp[input[i]].reduce((acc, cur) => acc += cur));
  }

  return result.join('\n').trim();
}

console.log(solution(T, input));
