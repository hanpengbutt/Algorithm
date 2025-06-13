let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, r] = input[0].split(' ').map(Number);
const t = input[1].split(' ').map(Number);
const connects = input
  .slice(2)
  .map((connect) => connect.split(' ').map(Number));

function solution(n, m, r, t, connects) {
  let result = new Array(n + 1).fill(0).map(() => new Set());
  const graph = new Array(n + 1).fill(0).map(() => []);
  let visited;

  for (let i = 0; i < r; i++) {
    const [a, b, l] = connects[i];
    graph[a].push([b, l]);
    graph[b].push([a, l]);
  }

  for (let i = 1; i < n + 1; i++) {
    visited = new Array(n + 1).fill(0);
    dfs(0, i, i);
  }

  function dfs(d, start, now) {
    result[start].add(now);
    visited[now] = d;
    graph[now].forEach(([next, nextD]) => {
      if ((!visited[next] || visited[next] > d + nextD) && d + nextD <= m) {
        dfs(d + nextD, start, next);
      }
    });
  }

  result = result.map((s) => {
    let sum = 0;
    s.forEach((v) => (sum += t[v - 1]));
    return sum;
  });
  return Math.max(...result);
}

console.log(solution(n, m, r, t, connects));
