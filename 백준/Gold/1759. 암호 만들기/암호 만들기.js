let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [L, C] = input[0].split(' ').map((v) => +v);
const chars = input[1].split(' ').sort();

function solution(L, C, chars) {
  function add(idx, char) {
    if (char.length === L) {
      const v = [...char].filter((c) =>
        ['a', 'e', 'i', 'o', 'u'].includes(c)
      ).length;
      const c = L - v;
      if (v >= 1 && c >= 2) console.log(char);
      return;
    }

    if (char.length + C - idx < L) {
      return;
    }

    if (idx === C) {
      return;
    }

    add(idx + 1, char + chars[idx]);
    add(idx + 1, char);
  }

  add(0, '');
}

solution(L, C, chars);
