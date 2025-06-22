let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

function solution(N, M, input) {
  const map = new Map();
  for (let i = 1; i < 1 + N; i++) {
    if (input[i].length >= M) {
      map.set(input[i], (map.get(input[i]) || 0) + 1);
    }
  }

  const voca = [...map.entries()];

  voca.sort((a, b) =>
    b[1] - a[1] === 0
      ? b[0].length - a[0].length === 0
        ? a[0] > b[0]
          ? 1
          : a[0] < b[0]
          ? -1
          : 0
        : b[0].length - a[0].length
      : b[1] - a[1]
  );

  return voca.map((word) => word[0]).join('\n');
}

console.log(solution(N, M, input));
