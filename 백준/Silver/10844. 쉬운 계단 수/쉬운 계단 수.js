let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const dp = new Array(N).fill(0).map(() => new Array(10).fill(1n));

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < 10; j++) {
      dp[i][j] =
        (j > 0 ? dp[i - 1][j - 1] : 0n) + (j < 9 ? dp[i - 1][j + 1] : 0n);
    }
  }

  return (
    (dp[N - 1].reduce((acc, cur) => (acc += cur)) - dp[N - 1][0]) % BigInt(10 ** 9)
  ).toString();
}

console.log(solution(N));
