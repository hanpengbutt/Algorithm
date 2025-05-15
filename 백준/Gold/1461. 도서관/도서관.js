let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const positions = input[1].split(' ').map(Number);

function solution(N, M, positions) {
  positions.sort((a, b) => a - b);
  let negative = [];
  let positive = [];

  positions.forEach((position) => {
    if (position < 0) {
      negative.push(position);
    } else {
      positive.push(position);
    }
  });

  positive.reverse();
  negative = negative.filter((_, i) => i % M === 0).map((v) => Math.abs(v));
  positive = positive.filter((_, i) => i % M === 0);

  return (
    ((negative.length && negative.reduce((acc, cur) => (acc += cur))) +
      (positive.length && positive.reduce((acc, cur) => (acc += cur)))) *
      2 -
    Math.max(negative.length && negative[0], positive.length && positive[0])
  );
}

console.log(solution(N, M, positions));
