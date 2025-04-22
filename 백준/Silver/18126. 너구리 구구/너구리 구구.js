let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const graph = new Array(N + 1).fill(0).map(() => []);
input.slice(1).forEach((connect) => {
  const [A, B, C] = connect.split(' ').map(Number);
  graph[A].push([B, C]);
  graph[B].push([A, C]);
});

function solution(N, graph) {
  const visited = new Array(N + 1).fill(0);
  visited[1] = 1;
  const q = [1];

  while (q.length) {
    const nowNode = q.shift();
    graph[nowNode].forEach((next) => {
      const [nextNode, count] = next;
      if (!visited[nextNode]) {
        visited[nextNode] = visited[nowNode] + count;
        q.push(nextNode);
      }
    });
  }

  return Math.max(...visited) - 1;
}

console.log(solution(N, graph));
