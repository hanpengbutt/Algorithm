let fs = require('fs');
let [_, ...nums] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map(Number);

function solution(nums) {
  let result = 0;
  const negative = [];
  const positive = [];

  nums.forEach((num) => {
    if (num <= 0) {
      negative.push(num);
    } else if (num === 1) {
      result++;
    } else {
      positive.push(num);
    }
  });

  negative.sort((a, b) => a - b);
  positive.sort((a, b) => b - a);

  for (let i = 0; i < negative.length; i += 2) {
    if (i + 1 < negative.length) {
      result += negative[i] * negative[i + 1];
    } else {
      result += negative[i];
    }
  }

  for (let i = 0; i < positive.length; i += 2) {
    if (i + 1 < positive.length) {
      result += positive[i] * positive[i + 1];
    } else {
      result += positive[i];
    }
  }

  return result;
}

console.log(solution(nums));
