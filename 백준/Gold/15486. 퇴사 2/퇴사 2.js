const fs = require('fs');
let [N, ...meetings] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
meetings = meetings.map((meeting) => meeting.split(' ').map((v) => +v));

function solution(N, meetings) {
  const map = new Map(new Array(N).fill(0).map((_, idx) => [idx + 1, []]));

  meetings.forEach((meeting, idx) => {
    const [T, P] = meeting;
    if (T + idx <= N) map.get(T + idx).push([idx + 1, P]);
  });

  const dp = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    const arr = [dp[i - 1]];
    map.get(i).forEach((meeting) => {
      const [T, P] = meeting;
      arr.push(dp[T - 1] + P);
    });

    dp[i] = Math.max(...arr);
  }

  return dp[N];
}

console.log(solution(N, meetings));
