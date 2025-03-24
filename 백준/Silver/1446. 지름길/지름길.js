let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, D] = input[0].split(' ').map(Number);
const shorts = input.slice(1).map((short) => short.split(' ').map(Number));

function solution(N, D, shorts) {
  shorts = shorts.filter(
    (short) => short[1] <= D && short[1] - short[0] > short[2]
  );
  shorts.sort((a, b) => a[1] - b[1]);

  const dp = new Array(D + 1).fill(0);
  const visited = [];

  shorts.forEach((short) => {
    const from = short[0];
    const to = short[1];
    const dist = short[2];

    let result = [];

    if (!visited.length) {
      result.push(from + dist);
    } else {
      const prev = visited[visited.length - 1];
      result.push(dp[prev] + to - prev);

      const filterVisited = visited.filter((v) => v <= from);
      const filterPrev = filterVisited.length
        ? filterVisited[filterVisited.length - 1]
        : 0;
      result.push(dp[filterPrev] + from - filterPrev + dist);
    }

    visited.push(to);
    dp[to] = Math.min(...result);
  });

  const max = visited.length ? visited[visited.length - 1] : 0;
  return dp[max] + D - max;
}

console.log(solution(N, D, shorts));

