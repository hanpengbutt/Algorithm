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

  const dp = new Array(N).fill(0);
  dp[0] = [s[0]];
  for (let i = 1; i < N; i++) {
    if (graph[i].length === 0) {
      dp[i] = [s[i]];
    } else {
      dp[i] = [
        ...graph[i]
          .map((idx) => dp[idx])
          .sort((a, b) => b.length - a.length)[0],
      ];
      dp[i].push(s[i]);
    }
  }

  dp.sort((a, b) => b.length - a.length);
  return `${dp[0].length}\n${dp[0].join(' ')}`;
}

console.log(solution(N, s));
