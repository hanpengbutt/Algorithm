let fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

T = +T;
input = input.map((v) => +v);

function solution(T, input) {
  const result = [];
  const dp = new Array(11).fill(0);
  dp[0] = 1;

  for (let i = 1; i < 11; i++) {
    dp[i] += dp[i - 1];
    if (i - 2 > -1) dp[i] += dp[i - 2];
    if (i - 3 > -1) dp[i] += dp[i - 3];
  }

  for (let i = 0; i < T; i++) {
    result.push(dp[input[i]]);
  }

  return result.join('\n').trim();
}

console.log(solution(T, input));
