let fs = require('fs');
let input = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v);

function solution(input) {
  let result = [];
  const maxN = Math.max(...input);

  const dp = new Array(maxN + 1).fill(1n);
  dp[1] = 1n;
  dp[2] = 3n;
  for (let i = 3; i < maxN + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] * 2n;
  }

  for (let i = 0; i < input.length; i++) {
    result.push(dp[input[i]]);
  }
  
  return result.join('\n').trim();
}

console.log(solution(input));
