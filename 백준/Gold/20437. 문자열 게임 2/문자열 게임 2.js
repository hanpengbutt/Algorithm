let fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const T = +input[0];

function solution(W, K) {
  let min = Infinity;
  let max = -Infinity;

  const map = new Map();
  for (let i = 0; i < W.length; i++) {
    const s = W[i];
    if (map.get(s)) {
      map.get(s).push(i);
    } else {
      map.set(s, [i]);
    }
  }

  let map_values = [...map.values()];
  map_values = map_values.filter((val) => val.length >= K);

  if (map_values.length === 0) return -1;

  map_values.forEach((val) => {
    let i = 0;
    while (i <= val.length - K) {
      const start = val[i];
      const end = val[i + K - 1];
      const len = end - start + 1;
      if (len < min) min = len;
      if (len > max) max = len;
      i += 1;
    }
  });

  return `${min} ${max}`
}

let idx = 1;
for (let i = 0; i < T; i++) {
  const W = input[idx];
  const K = +input[idx + 1];

  console.log(solution(W, K));
  idx += 2;
}
