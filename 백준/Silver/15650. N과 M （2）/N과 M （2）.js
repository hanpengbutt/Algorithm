let fs = require('fs');
const [N, M] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map(Number);

function solution(N, M) {
  function select(idx, selected) {
    if (idx === N) {
      if (selected.length === M) console.log(selected.join(' '));
      return;
    }

    if (selected.length > M) return;

    select(idx + 1, [...selected, idx + 1]);
    select(idx + 1, selected);
  }

  select(0, []);
}

solution(N, M)
