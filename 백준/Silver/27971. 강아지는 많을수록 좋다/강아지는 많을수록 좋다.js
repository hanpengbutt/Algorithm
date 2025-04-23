let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let [N, M, A, B] = input[0].split(' ').map(Number);
const intervals = input
  .slice(1)
  .map((interval) => interval.split(' ').map(Number));

function solution(N, M, A, B, intervals) {
  let result = [];

  function bfs(node) {
    const visited = new Array(N + 1).fill(0);
    for (let i = 0; i < M; i++) {
      const [start, end] = intervals[i];
      for (let j = start; j <= end; j++) {
        visited[j] = -1;
      }
    }

    if (visited[node] === -1) return 0;

    visited[node] = 1;
    const q = [node];
    let idx = 0

    while (idx <= q.length && !visited[N]) {
      const now = q[idx]
      idx += 1

      let next = now + A;
      if (next <= N && visited[next] === 0) {
        visited[next] = visited[now] + 1;
        q.push(next);
      }
      next = now + B;
      if (next <= N && visited[next] === 0) {
        visited[next] = visited[now] + 1;
        q.push(next);
      }
    }
    return visited[N];
  }

  let count = bfs(A);
  if (count) result.push(count);
  count = bfs(B);
  if (count) result.push(count);

  return result.length ? Math.min(...result) : -1;
}

console.log(solution(N, M, A, B, intervals));
