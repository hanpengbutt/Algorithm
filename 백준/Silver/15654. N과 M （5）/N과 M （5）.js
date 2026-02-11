const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].split(' ').map((v) => +v);
const nums = input[1].split(' ').map((v) => +v);

function solution(N, M, nums) {
  nums = nums.sort((a, b) => a - b);
  const result = [];
  const visited = new Array(N).fill(0);

  function dfs(depth, selected) {
    if (depth === M) {
      result.push(selected.join(' '));
      return;
    }

    nums.forEach((num, idx) => {
      if (!visited[idx]) {
        visited[idx] = 1;
        dfs(depth + 1, [...selected, num]);
        visited[idx] = 0;
      }
    });
  }

  dfs(0, []);

  return result.join('\n');
}

console.log(solution(N, M, nums));