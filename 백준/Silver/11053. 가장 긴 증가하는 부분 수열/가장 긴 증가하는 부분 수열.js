let fs = require('fs');
let [N, s] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
s = s.split(' ').map((v) => +v);

function solution(N, s) {
  const graph = new Array(N).fill(0).map(() => []);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (s[j] < s[i]) graph[i].push(j);
    }
  }

  const dp = new Array(N).fill(1);
  for (let i = 1; i < N; i++) {
    let max = 0;
    graph[i].forEach((idx) => {
      if (dp[idx] > max) max = dp[idx];
    });
    dp[i] = max + 1;
  }

  return Math.max(...dp);
}

console.log(solution(N, s));
