const fs = require('fs');
let [N, ...meetings] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
meetings = meetings.map((meeting) => meeting.split(' ').map((v) => +v));

function solution(N, meetings) {
  let result = 0;
  let max = 0;
  meetings.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);

  meetings.forEach((meeting) => {
    const [start, end] = meeting;
    if (max <= start) {
      result += 1;
      max = end;
    }
  });

  return result;
}

console.log(solution(N, meetings));
