let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const ladders = input
  .slice(1, 1 + N)
  .map((ladder) => ladder.split(' ').map((v) => +v));
const snakes = input
  .slice(1 + N)
  .map((snake) => snake.split(' ').map((v) => +v));

function solution(N, M, ladders, snakes) {
  const visited = new Array(101).fill(0);

  const q = [1];
  visited[1] = 1;

  while (!visited[100]) {
    const now = q.shift();
    for (let i = 1; i < 7; i++) {
      let next = now + i;
      if (next < 101 && !visited[next]) {
        visited[next] = visited[now] + 1;

        const l = ladders.find((ladder) => ladder[0] === next);
        const s = snakes.find((snake) => snake[0] === next);

        if (l) {
          if (!visited[l[1]]) {
            visited[l[1]] = visited[now] + 1;
            q.push(l[1]);
          }
        } else if (s) {
          if (!visited[s[1]]) {
            visited[s[1]] = visited[now] + 1;
            q.push(s[1]);
          }
        } else {
          q.push(next);
        }
      }
    }
  }

  return visited[100] - 1;
}

console.log(solution(N, M, ladders, snakes));
