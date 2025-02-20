let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);

function solution(N, M, connect) {
  const graph = new Array(N + 1).fill(0).map(() => []);
  const result = new Array(N + 1)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => []));
  let visited = new Array(N + 1).fill(0);

  for (let i = 0; i < M; i++) {
    const [a, b] = connect[i].split(' ').map((v) => +v);
    graph[a].push(b);
  }

  function dfs(idx, now) {
    visited[now] = 1;
    if (idx !== now) result[idx][1].push(now);

    for (const next of graph[now]) {
      if (!visited[next]) {
        dfs(idx, next);
      }
    }
  }

  for (let i = 1; i < N + 1; i++) {
    dfs(i, i);
    visited = new Array(N + 1).fill(0);
  }

  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (i !== j && result[j][1].includes(i)) {
        result[i][0].push(j);
      }
    }
  }

  return result.filter((v) => v[0].length + v[1].length === N - 1).length;
}

console.log(solution(N, M, input.slice(1)));
