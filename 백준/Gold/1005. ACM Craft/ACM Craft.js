let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const T = +input[0];
let idx = 1;

for (let i = 0; i < T; i++) {
  const [N, K] = input[idx].split(' ').map(Number);
  const times = input[idx + 1].split(' ').map(Number);
  const connects = input
    .slice(idx + 2, idx + 2 + K)
    .map((connect) => connect.split(' ').map(Number));
  const W = +input[idx + 2 + K];

  idx += 3 + K;
  solution(N, times, connects, W);
}

function solution(N, times, connects, W) {
  const result = new Array(N + 1).fill(false);
  const graph = new Array(N + 1).fill(0).map(() => []);

  connects.forEach((connect) => {
    const [X, Y] = connect;
    graph[Y].push(X);
  });

  function getTime(d) {
    const parentTime = [];

    graph[d].forEach((parent) => {
      if (result[parent] === false) {
        result[parent] = getTime(parent);
      }

      parentTime.push(result[parent]);
    });

    return (parentTime.length ? Math.max(...parentTime) : 0) + times[d - 1];
  }

  result[W] = getTime(W);

  console.log(result[W]);
}
