let fs = require('fs');
let [N, heights] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
heights = heights.split(' ').map(Number);

function solution(N, heights) {
  let result = 0;

  // 앞, 뒷면
  result += heights.reduce((acc, cur) => (acc += cur)) * 2;

  // 위, 아래면
  result += N * 2;

  // 옆면
  for (let i = 0; i < N - 1; i++) {
    const now = heights[i];
    const next = heights[i + 1];
    result += Math.abs(next - now);
  }
  result += heights[0] + heights[N - 1];

  return result;
}

console.log(solution(N, heights));