let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let N = +input[0];
let M = +input[1];
let info = input.slice(2, 2 + M).map((v) => v.split(' ').map(Number));
let [start, end] = input[2 + M].split(' ').map(Number);

function solution(N, info, start, end) {
  if (start === end) return 0;

  const graph = new Array(N).fill(0).map(() => new Array(N).fill(Infinity));

  for (let [s, e, c] of info) {
    if (c < graph[s - 1][e - 1]) graph[s - 1][e - 1] = c;
  }

  const cost = [...graph[start - 1]].map((v, i) => [i + 1, v]);
  const visited = new Array(N).fill(0);
  visited[start - 1] = 1;

  while (1) {
    const next = cost
      .filter((c) => !visited[c[0] - 1])
      .sort((a, b) => a[1] - b[1]);
    if (!next.length) break;
    const [i, c] = next[0];

    visited[i - 1] = 1;
    graph[i - 1].forEach((v, j) => {
      if (c + v < cost[j][1]) cost[j][1] = c + v;
    });
  }

  return cost[end - 1][1];
}

console.log(solution(N, info, start, end));
