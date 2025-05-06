let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const connects = input
  .slice(1)
  .map((connect) => connect.split(' ').map(Number));

function solution(N, connects) {
  const graph = new Array(N + 1).fill(0).map(() => []);
  connects.forEach((connect) => {
    const [a, b] = connect;
    graph[a].push(b);
    graph[b].push(a);
  });

  const result = new Array(N + 1).fill(0);

  function getParent(parent) {
    graph[parent].forEach((chid) => {
      if (!result[chid] && chid !== 1) {
        result[chid] = parent;
        getParent(chid);
      }
    });
  }

  getParent(1);

  return result.slice(2).join('\n')
}

console.log(solution(N, connects));
