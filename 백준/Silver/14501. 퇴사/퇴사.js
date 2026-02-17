const fs = require('fs');
let [N, ...meetings] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
meetings = meetings.map((meeting) => meeting.split(' ').map((v) => +v));

function solution(N, meetings) {
  meetings = meetings
    .map((meeting, idx) => [idx + 1, meeting[0] + idx, meeting[1]])
    .filter((meeting) => meeting[1] <= N)
    .sort((a, b) => a[1] - b[1]);

  const dp = new Array(meetings.length + 1)
    .fill(0)
    .map(() => new Array(N + 1).fill(0));

  for (let i = 1; i <= meetings.length; i++) {
    const [start, end, value] = meetings[i - 1];
    const max = Math.max(dp[i - 1][end], dp[i - 1][start - 1] + value);
    for (let j = 1; j <= N; j++) {
      dp[i][j] = j < end ? dp[i - 1][j] : max;
    }
  }

  return dp[meetings.length][N];
}

console.log(solution(N, meetings));
