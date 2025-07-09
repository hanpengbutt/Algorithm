let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [T, W] = input[0].split(' ').map(Number);
const trees = input.slice(1).map(Number);

function solution(T, W, trees) {
  // dp[초][나무][이동횟수]
  const dp = new Array(T)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => new Array(W + 1).fill(null)));

  // 1초에 1번 나무에 서 있을 때(이동 횟수 = 0) 받을 수 있는 자두의 개수
  dp[0][0][0] = trees[0] === 1 ? 1 : 0;
  // 1초에 2번 나무에 서 있을 때(이동 횟수 = 1) 받을 수 있는 자두의 개수
  dp[0][1][1] = trees[0] === 2 ? 1 : 0;

  for (let i = 1; i < T; i++) {
    // 2초부터
    for (let j = 0; j <= W; j++) {
      // 1번 나무에 대해
      const tree1Options = [];
      if (dp[i - 1][0][j] !== null) tree1Options.push(dp[i - 1][0][j]);
      if (j > 0 && dp[i - 1][1][j - 1] !== null)
        tree1Options.push(dp[i - 1][1][j - 1]);
      if (tree1Options.length)
        dp[i][0][j] = Math.max(...tree1Options) + (trees[i] === 1 ? 1 : 0);
      // 2번 나무에 대해
      const tree2Options = [];
      if (dp[i - 1][1][j] !== null) tree2Options.push(dp[i - 1][1][j]);
      if (j > 0 && dp[i - 1][0][j - 1] !== null)
        tree2Options.push(dp[i - 1][0][j - 1]);
      if (tree2Options.length)
        dp[i][1][j] = Math.max(...tree2Options) + (trees[i] === 2 ? 1 : 0);
    }
  }

  return Math.max(...dp[T - 1].flat());
}

console.log(solution(T, W, trees));
