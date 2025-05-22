let fs = require('fs');
const [N, M] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map(Number);

function solution(N, M) {
  function select(idx, selected) {
    if (idx === M) {
      if (selected.size === M) console.log([...selected.values()].join(' '));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!selected.has(i)) select(idx + 1, new Set([...selected, i]));
    }
  }

  for (let i = 1; i <= N; i++) {
    select(1, new Set([i]));
  }
}

solution(N, M);
