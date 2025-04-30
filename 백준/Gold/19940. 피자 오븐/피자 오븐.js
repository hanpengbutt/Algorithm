let fs = require('fs');
let [T, ...times] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map(Number);

function solution(time) {
  const result = new Array(5).fill(0);

  result[0] += Math.floor(time / 60); // +60
  time = time % 60;

  if (time < 36) {
    if (time % 10 <= 5) {
      result[1] += Math.floor(time / 10); // +10
      result[3] += time % 10; // +1
    } else {
      result[1] += Math.floor(time / 10) + 1; // +10
      result[4] += 10 - (time % 10); // -1
    }
  } else {
    if (time % 10 < 5) {
      result[0] += 1; // +60
      result[2] += 60 - time <= 10 ? 1 : 2; // -10
      result[3] += time % 10; // +1
    } else {
      result[0] += 1; // +60
      result[2] += 60 - time <= 10 ? 0 : 60 - time <= 20 ? 1 : 2; // -10
      result[4] += 10 - (time % 10); // -1
    }
  }

  return result.join(' ');
}

for (let i = 0; i < T; i++) {
  console.log(solution(times[i]));
}