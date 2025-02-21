let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const dp = new Array(N + 1).fill(new Array());

  for (let i = 1; i < N + 1; i++) {
    let len = Infinity;
    let calc;

    if (i % 3 === 0) {
      if (dp[i / 3].length + 1 < len) {
        len = dp[i / 3].length + 1;
        calc = [i, ...dp[i / 3]];
      }
    }

    if (i % 2 === 0) {
      if (dp[i / 2].length + 1 < len) {
        len = dp[i / 2].length + 1;
        calc = [i, ...dp[i / 2]];
      }
    }

    if (dp[i - 1].length + 1 < len) {
      len = dp[i - 1].length + 1;
      calc = [i, ...dp[i - 1]];
    }

    dp[i] = calc;
  }

  return `${dp[N].length - 1}\n${dp[N].join(' ')}`;
}

console.log(solution(N));