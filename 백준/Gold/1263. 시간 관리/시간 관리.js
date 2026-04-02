const fs = require('fs');
let [N, ...jobs] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
jobs = jobs.map((job) => job.split(' ').map((v) => +v));

function solution(N, jobs) {
  jobs.sort((a, b) => b[1] - a[1]);
  let time = Infinity;

  for (const [during, end] of jobs) {
    if (end < time) time = end;
    time -= during;
  }

  return time >= 0 ? time : -1;
}

console.log(solution(N, jobs));