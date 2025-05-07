let fs = require('fs');
let [_, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

input = input.map((t) => t.split(' ').map(Number));

function solution(input) {
  input.forEach((t) => {
    const [x, y] = t;
    if (y - x <= 3) {
      console.log(y - x);
    } else {
      const sqrt = ~~Math.sqrt(y - x);
      let count = 1 + 2 * (sqrt - 1);
      let diff = y - x - sqrt ** 2;

      if (diff) {
        count += diff > sqrt ? 2 : 1;
      }

      console.log(count)
    }
  });
}

solution(input);
