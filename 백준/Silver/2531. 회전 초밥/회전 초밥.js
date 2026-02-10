const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, d, k, c] = input[0].split(' ').map((v) => +v);
const sushi = input.slice(1).map((v) => +v);

function solution(N, d, k, c, sushi) {
  let result = 0;

  for (let i = 0; i < N; i++) {
    const set = new Set([c]);
    for (let j = 0; j < k; j++) {
      set.add(sushi[(i + j) % N]);
    }
    result = Math.max(result, set.size);
  }

  return result;
}

console.log(solution(N, d, k, c, sushi));
