let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const M = +input[1];
const connect = input.slice(2, 2 + N).map((c) => c.split(' ').map(Number));
const trip = input[2 + N].split(' ').map(Number);

function solution(N, M, connect, trip) {
  const graph = new Array(N + 1).fill(0).map(() => []);
  const group = new Array(N + 1).fill(0);

  connect.forEach((c, node) => {
    c.forEach((isConnect, connectNode) => {
      if (isConnect) {
        graph[node + 1].push(connectNode + 1);
      }
    });
  });

  function bfs(node, groupId) {
    const visited = new Array(N + 1).fill(0);
    const q = [];

    visited[node] = 1;
    q.push(node);
    group[node] = groupId

    while (q.length) {
      const now = q.shift();
      graph[now].forEach((next) => {
        if (!visited[next]) {
          visited[next] = 1;
          q.push(next);
          group[next] = groupId
        }
      });
    }
  }

  let groupId = 1
  for(let i = 1; i < N + 1; i++) {
    if(!group[i]) {
        bfs(i, groupId)
        groupId += 1
    }
  }

  return new Set(trip.map((t) => group[t])).size === 1 ? 'YES' : 'NO'
}

console.log(solution(N, M, connect, trip));
