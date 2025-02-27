let fs = require('fs');
let [N, s] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
s = s.split(' ').map((v) => +v);

function solution(N, s) {
  if (s.filter((v) => v >= 0).length === 0) {
    return Math.max(...s);
  }

  const dp = new Array(N).fill(0);
  dp[0] = Math.max(s[0], 0);

  for(let i = 1; i < N ; i++) {
    dp[i] = Math.max(dp[i-1] + s[i], 0)
  }

  return Math.max(...dp)
}

console.log(solution(N, s));
