let fs = require('fs');
let [N, ...querys] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
querys = querys.map((query) => query.split(' ').map(Number));

function solution(N, querys) {
  const stairs = [];
  const idxs = [];

  for (let i = 0; i < N; i++) {
    const [a, b] = querys[i];
    if (a === 1) {
      stairs.push(b);
    } else if (stairs.length) {
      let prevMax = stairs[stairs.length - 1];
      if (i > 0 && querys[i - 1][0] === 2) {
        prevMax = idxs[idxs.length - 1][2];
        idxs.pop();
      }
      const max = Math.max(prevMax - b, 0);

      idxs.push([
        idxs.length ? idxs[idxs.length - 1][1] + 1 : 0,
        stairs.length - 1,
        max,
      ]);
    }
  }

  let min = Infinity;
  for (let i = idxs.length - 1; i > -1; i--) {
    const [start, end, value] = idxs[i];
    min = Math.min(min, value);
    for (let j = start; j <= end; j++) {
      if (stairs[j] > min) stairs[j] = min;
    }
  }

  return stairs.length ? stairs.reduce((acc, cur) => (acc += cur)) : 0;
}

console.log(solution(N, querys));

