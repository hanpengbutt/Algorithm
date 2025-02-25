let fs = require('fs');
let N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const q = [];
  const visited = new BigUint64Array(N + 1).fill(0n);
  q.push(N);
  visited[N] = 1n;

  while (!visited[1]) {
    const now = q.shift();
    if (now % 3 === 0 && !visited[now / 3]) {
      visited[now / 3] = visited[now] + 1n;
      q.push(now / 3);
    }
    if (now % 2 === 0 && !visited[now / 2]) {
      visited[now / 2] = visited[now] + 1n;
      q.push(now / 2);
    }
    if (!visited[now - 1]) {
      visited[now - 1] = visited[now] + 1n;
      q.push(now - 1);
    }
  }

  return Number(visited[1]) - 1;
}

console.log(solution(N));
