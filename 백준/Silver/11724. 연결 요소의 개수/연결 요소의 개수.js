let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const edge = input.slice(1).map((e) => e.split(' ').map((v) => +v));

function solution(N, M, edge) {
  const graph = new Array(N + 1).fill(0).map(() => []);
  const visited = new Array(N + 1).fill(0);
  let count = 0;

  function bfs(node) {
    const q = [];
    visited[node] = 1;
    q.push(node);

    while (q.length !== 0) {
      const now = q.shift();
      for (const next of graph[now]) {
        if (!visited[next]) {
          q.push(next);
          visited[next] = 1;
        }
      }
    }
  }

  edge.forEach((e) => {
    const [node1, node2] = e;
    graph[node1].push(node2);
    graph[node2].push(node1);
  });

  for (let i = 1; i < N + 1; i++) {
    if (!visited[i]) {
      bfs(i);
      count += 1;
    }
  }

  return count;
}

console.log(solution(N, M, edge));
