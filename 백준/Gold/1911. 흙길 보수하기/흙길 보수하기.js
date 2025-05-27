let fs = require('fs');
let input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const pools = input.slice(1).map((pool) => pool.split(' ').map(Number));

pools.sort((a, b) => a[0] - b[0]);

let result = 0;
let idx = 0;

for (let i = 0; i < N; i++) {
  let [start, end] = pools[i];
  start = Math.max(start, idx);
  const count = Math.ceil((end - start) / M);
  result += count;
  idx = start + M * count;
}

console.log(result)