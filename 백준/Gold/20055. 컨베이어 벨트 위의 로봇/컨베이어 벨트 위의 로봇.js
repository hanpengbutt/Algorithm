let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

function solution(N, K, A) {
  let start = 0;
  let end = 2 * N - 1;
  let mid = (start + N - 1) % (2 * N);
  let robots = [];
  let count = A.filter((a) => a === 0).length;
  let step = 0;

  while (count < K) {
    start = start - 1 === -1 ? 2 * N - 1 : start - 1;
    end = end - 1 === -1 ? 2 * N - 1 : end - 1;
    mid = mid - 1 === -1 ? 2 * N - 1 : mid - 1;

    robots = robots.filter((robot) => robot !== mid);

    const newRobots = [];

    robots.forEach((robot, idx) => {
      let next = robot + 1 === 2 * N ? 0 : robot + 1;
      if (!robots.includes(next) && A[next] >= 1) {
        robots[idx] = next;
        A[next] -= 1;
        if (A[next] === 0) count += 1;
        if (mid !== next) newRobots.push(next);
      } else {
        newRobots.push(robot);
      }
    });

    robots = newRobots;

    if (A[start]) {
      robots.push(start);
      A[start] -= 1;
      if (A[start] === 0) count += 1;
    }

    step += 1;
  }

  return step;
}

console.log(solution(N, K, A));
