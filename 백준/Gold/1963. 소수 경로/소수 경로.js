const fs = require('fs');
let [T, ...nums] = fs.readFileSync(0, 'utf8').trim().split('\n');
T = +T;
nums = nums.map((num) => num.split(' ').map((v) => +v));

function solution(T, nums) {
  const result = [];

  const isPrimeNums = new Array(10 ** 4).fill(1);
  isPrimeNums[0] = 0;
  isPrimeNums[1] = 0;

  for (let i = 2; i ** 2 <= isPrimeNums.length; i++) {
    if (isPrimeNums[i]) {
      for (let j = i ** 2; j < isPrimeNums.length; j += i) {
        isPrimeNums[j] = 0;
      }
    }
  }

  nums.forEach(([start, end]) => {
    const queue = [start];
    let idx = 0;
    const visited = new Array(9000).fill(0);
    visited[start - 1000] = 1;

    while (idx < queue.length && !visited[end - 1000]) {
      const now = queue[idx++];
      for (let i = 1; i <= 1000; i *= 10) {
        const sub = Math.floor((now / i) % 10);
        for (let j = 0; j < 10; j++) {
          if (j !== sub && (i !== 1000 || j !== 0)) {
            const next = now - sub * i + j * i;
            if (isPrimeNums[next] && !visited[next - 1000]) {
              queue.push(next);
              visited[next - 1000] = visited[now - 1000] + 1;
            }
          }
        }
      }
    }

    result.push(visited[end - 1000] ? visited[end - 1000] - 1 : 'Impossible');
  });

  return result.join('\n');
}

console.log(solution(T, nums));
