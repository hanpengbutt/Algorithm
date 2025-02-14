let fs = require('fs');
let [k, sign] = fs.readFileSync(0, 'utf8').trim().split('\n');
k = +k;
sign = sign.split(' ');

function solution(k, sign) {
  let min = +Infinity;
  let max = 0;

  function add(idx, selected, rest) {
    if (selected.length > 1) {
      for (let i = 0; i < selected.length - 1; i++) {
        if (sign[i] === '>') {
          if (selected[i] < selected[i + 1]) {
            return;
          }
        } else {
          if (selected[i] > selected[i + 1]) {
            return;
          }
        }
      }
    }

    if (idx === k + 1) {
      const num = selected.join('');
      if (+num > +max) max = num;
      if (+num < +min) min = num;
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      const newSelected = [...selected];
      newSelected.push(rest[i]);
      const newRest = [...rest];
      newRest.splice(i, 1);

      add(idx + 1, newSelected, newRest);
    }
  }

  add(
    0,
    [],
    new Array(10).fill(0).map((_, i) => i)
  );

  console.log(max);
  console.log(min);
}

solution(k, sign);
