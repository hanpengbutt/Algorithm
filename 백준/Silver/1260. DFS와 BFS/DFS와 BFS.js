let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, V] = input[0].split(' ').map((v) => +v);
const edge = input.slice(1).map((e) => e.split(' ').map((v) => +v));

function solution() {
  const node = new Array(N + 1).fill(0).map(() => []);
  for (let i = 0; i < M; i++) {
    const [node1, node2] = edge[i];
    node[node1].push(node2);
    node[node2].push(node1);
  }
  node.map((n) => n.sort((a, b) => a - b));
  let visited = new Array(N + 1).fill(false);

  const result_dfs = [];
  function dfs(now) {
    result_dfs.push(now);
    visited[now] = true;

    for (let i = 0; i < node[now].length; i++) {
      const next = node[now][i];
      if (!visited[next]) {
        dfs(next);
      }
    }
  }

  const result_bfs = [];
  function bfs(start) {
    const q = [start];
    visited[start] = true;

    while (q.length > 0) {
      let now = q.shift();
      result_bfs.push(now);
      for (let i = 0; i < node[now].length; i++) {
        const next = node[now][i];
        if (!visited[next]) {
          q.push(next);
          visited[next] = true;
        }
      }
    }
  }

  dfs(V);
  console.log(result_dfs.join(' '));

  visited = new Array(N + 1).fill(false);
  bfs(V);
  console.log(result_bfs.join(' '));
}

solution();
