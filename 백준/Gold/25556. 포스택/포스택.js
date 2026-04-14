const fs = require('fs');
let [_, nums] = fs.readFileSync(0, 'utf8').trim().split('\n');
nums = nums.split(' ').map((v) => +v);

function solution(nums) {
  const stacks = new Array(4).fill(0).map(() => [0]);

  for (const num of nums) {
    let idx = -1;

    stacks.forEach((stack, i) => {
      const a = stack[stack.length - 1];
      if (
        a < num &&
        (idx === -1 ||
          (stacks[idx].length && stacks[idx][stacks[idx].length - 1] < a))
      ) {
        idx = i;
      }
    });

    if (idx === -1) return 'NO';
    stacks[idx].push(num);
  }

  return 'YES';
}

console.log(solution(nums));
