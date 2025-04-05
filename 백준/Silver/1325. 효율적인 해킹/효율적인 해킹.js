let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const comps = input.slice(1).map((comp) => comp.split(' ').map(Number));

function solution(N, M, comps) {
  const graph = new Array(N + 1).fill(0).map(() => []);
  comps.forEach((comp) => {
    const [child, parent] = comp;
    graph[parent].push(child);
  });

  const counts = new Array(N + 1).fill(0);

  function bfs(node) {
    const visited = new Array(N + 1).fill(0);
    let count = 1;
    let firstIdx = 0;

    visited[node] = 1;
    const q = [node];

    while (firstIdx < q.length) {
      const now = q[firstIdx++];

      for (let i = 0; i < graph[now].length; i++) {
        const next = graph[now][i];

        if (!visited[next]) {
          visited[next] = 1;
          q.push(next);
          count += 1;
        }
      }
    }

    return count;
  }

  for (let i = 1; i <= N; i++) {
    counts[i] = bfs(i);
  }

  const result = [];
  const max = Math.max(...counts);
  counts.forEach((count, idx) => {
    if (count === max) result.push(idx);
  });

  return result.join(' ');
}

console.log(solution(N, M, comps));
