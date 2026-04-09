const fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');
T = +T;
input = input.map((i) => i.split(' ').map((v) => +v));

function solution(T, input) {
  const max_n = Math.max(...input.map((i) => i[0]));
  const max_k = Math.max(...input.map((i) => i[1]));

  const dp = new Array(max_n + 1)
    .fill(0)
    .map(() => new Array(max_k + 1).fill(0).map(() => [0n, 0n]));

  dp[2][0] = [2n, 1n];
  dp[2][1] = [0n, 1n];

  for (let n = 3; n < max_n + 1; n++) {
    for (let k = 0; k < n && k < max_k + 1; k++) {
      dp[n][k] = [
        dp[n - 1][k][0] + dp[n - 1][k][1],
        dp[n - 1][k][0] + (k > 0 ? dp[n - 1][k - 1][1] : 0n),
      ];
    }
  }

  return input
    .map(([n, k]) => dp[n][k].reduce((acc, cur) => (acc += cur)))
    .join('\n');
}

console.log(solution(T, input));
