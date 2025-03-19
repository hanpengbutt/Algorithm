let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const M = +input[1];
const comps = input.slice(2).map((comp) => comp.split(' ').map(Number));

function solution(N, M, comps) {
  const result = [];
  const graph = new Array(N + 1).fill(0).map(() => {
    return {
      left: [],
      right: [],
    };
  });

  comps.forEach((comp) => {
    const [a, b] = comp;
    graph[a].left.push(b);
    graph[b].right.push(a);
  });

  let result_dfs = [];

  function dfs(now, type, visited) {
    result_dfs.push(now);

    for (let i = 0; i < graph[now][type].length; i++) {
      const next = graph[now][type][i];
      if (!visited.includes(next)) {
        visited.push(next)
        dfs(next, type, visited);
      }
    }
  }

  for (let i = 1; i < N + 1; i++) {
    const left = graph[i].left;
    const right = graph[i].right;

    const left_dfs = [];
    const right_dfs = [];

    left.forEach((l) => {
      dfs(l, 'left', left);
      result_dfs.forEach((result) => {
        if (!left_dfs.includes(result)) left_dfs.push(result);
      });
      result_dfs = [];
    });

    right.forEach((r) => {
      dfs(r, 'right', right);
      result_dfs.forEach((result) => {
        if (!right_dfs.includes(result)) right_dfs.push(result);
      });
      result_dfs = [];
    });

    result.push(N - (1 + left_dfs.length + right_dfs.length));
  }

  return result.join('\n').trim();
}

console.log(solution(N, M, comps));
