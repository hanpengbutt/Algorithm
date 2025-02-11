let fs = require('fs');
let [N, ...chat] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;

function solution(N, chat) {
  let map = new Map();
  let count = 0;

  chat.forEach((c) => {
    if (c === 'ENTER') {
      map = new Map();
    } else {
      if (!map.get(c)) {
        map.set(c, true);
        count++;
      }
    }
  });

  return count;
}

console.log(solution(N, chat));
