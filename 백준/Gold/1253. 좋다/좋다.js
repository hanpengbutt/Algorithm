let fs = require('fs');
let [N, s] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
s = s.split(' ').map(Number);

function solution(N, s) {
  s.sort((a, b) => a - b);
  let map = new Map();
  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i !== j) {
        if (map.get(s[j])) {
          result += 1;
          break;
        }
        map.set(s[i] - s[j], 1);
      }
    }
    map = new Map();
  }

  return result;
}

console.log(solution(N, s));
