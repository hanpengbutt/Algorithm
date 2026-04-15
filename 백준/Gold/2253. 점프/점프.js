const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const rocks = input.slice(1).map((v) => +v);

function solution(N, M, rocks) {
  const visited = new Array(N + 1).fill(0).map(() => new Array(200).fill(0));
  rocks = new Set(rocks);
  if (rocks.has(2)) return -1;
  visited[2][1] = 1;
  const queue = [[2, 1]];
  let idx = 0;
  const vector = [(x) => x + 1, (x) => x, (x) => x - 1];

  while (idx < queue.length) {
    const [now, count] = queue[idx++];
    for (const f of vector) {
      const next_count = f(count);
      const next = now + next_count;
      if (
        next_count &&
        next <= N &&
        !rocks.has(next) &&
        !visited[next][next_count]
      ) {
        if (next === N) return visited[now][count] + 1;
        visited[next][next_count] = visited[now][count] + 1;
        queue.push([next, next_count]);
      }
    }
  }

  return -1;
}

console.log(solution(N, M, rocks));
