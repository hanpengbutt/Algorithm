let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let result = '';

function solution(k, S) {
  function add(idx, selected) {
    if (selected.length === 6) {
      result += selected.join(' ');
      result += '\n';
      return;
    }

    if (idx === k) {
      return;
    }

    const newSelected = [...selected];
    newSelected.push(S[idx]);

    add(idx + 1, newSelected);
    add(idx + 1, selected);
  }

  add(0, []);

  return;
}

let i = 0;
while (true) {
  if (input[i] == 0) break;
  let [k, ...S] = input[i].split(' ');
  k = +k;
  S = S.map((v) => +v);

  solution(k, S);
  result += '\n';
  i++;
}

console.log(result.trimEnd());
