let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const info = input.slice(1, N + 1).map((i) => i.split(' '));
const site = input.slice(N + 1);

function solution(N, M, info, site) {
  const result = [];
  const map = new Map();

  info.forEach((i) => {
    const [s, p] = i;
    map.set(s, p);
  });

  site.forEach((s) => {
    result.push(map.get(s));
  });

  return result.join('\n').trim();
}

console.log(solution(N, M, info, site));
