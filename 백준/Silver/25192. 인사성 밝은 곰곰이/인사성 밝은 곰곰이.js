let fs = require('fs');
let [N, ...chat] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;

function solution(N, chat) {
  let count = 0;
  let counts = {};
  for (let i = 0; i < N; i++) {
    if (chat[i] === 'ENTER') {
      counts = {};
    } else {
      if (counts[chat[i]] !== 1) {
        counts[chat[i]] = 1;
        count += 1;
      }
    }
  }

  return count;
}

console.log(solution(N, chat));
