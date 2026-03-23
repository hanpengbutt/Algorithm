const fs = require('fs');
const N = +fs.readFileSync(0, 'utf8').trim();

function solution(N) {
  const map = new Map();
  for (let i = 0; i < 10; i++) {
    map.set(i, [i % 2, i % 2]);
  }

  for (let i = 10; i < 10 ** 2; i++) {
    const a = ~~(i / 10);
    const b = i % 10;

    map.set(i, [
      (a % 2) + (b % 2) + map.get(a + b)[0],
      (a % 2) + (b % 2) + map.get(a + b)[0],
    ]);
  }

  function getMinMax(num) {
    if (map.get(num)) {
      return map.get(num);
    }

    const str = num.toString();
    const len = str.length;

    let min = +Infinity;
    let max = -Infinity;
    let count = 0;

    for (let i = 0; i < len; i++) {
      count += +str[i] % 2;
    }

    for (let i = 1; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const a = ~~(num / 10 ** (len - i));
        const b = ~~((num - a * 10 ** (len - i)) / 10 ** (len - j));
        const c = (num - a * 10 ** (len - i)) % 10 ** (len - j);

        const _min = getMinMax(a + b + c)[0] + count;
        const _max = getMinMax(a + b + c)[1] + count;

        if (_min < min) min = _min;
        if (_max > max) max = _max;
      }
    }

    map.set(num, [min, max]);
    return [min, max];
  }

  return getMinMax(N).join(' ');
}

console.log(solution(N));
