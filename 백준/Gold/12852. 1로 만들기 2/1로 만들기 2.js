const fs = require('fs');
const N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  if (N === 1) return '0\n1';
  
  const dp = new Array(N + 1).fill(0).map(() => [0, 0]);
  let nows = [N];

  while (!dp[1][0]) {
    const newNows = [];
    nows.forEach((now) => {
      const nowCount = dp[now][0];

      if (!(now % 3) && !dp[now / 3][0]) {
        newNows.push(now / 3);
        dp[now / 3][0] = nowCount + 1;
        dp[now / 3][1] = now;
      }

      if (!(now % 2) && !dp[now / 2][0]) {
        newNows.push(now / 2);
        dp[now / 2][0] = nowCount + 1;
        dp[now / 2][1] = now;
      }

      if (now - 1 > 0 && !dp[now - 1][0]) {
        newNows.push(now - 1);
        dp[now - 1][0] = nowCount + 1;
        dp[now - 1][1] = now;
      }
    });
    nows = newNows;
  }

  let now = 1;
  const reuslt = [1];
  for (let i = 0; i < dp[1][0]; i++) {
    now = dp[now][1];
    reuslt.push(now);
  }

  return [dp[1][0], reuslt.reverse().join(' ')].join('\n');
}

console.log(solution(N));
