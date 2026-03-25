const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, H] = input[0].split(' ').map((v) => +v);
const tops = [];
const bottoms = [];

for (let i = 1; i <= N; i++) {
  if (i % 2 === 0) {
    tops.push(+input[i]);
  } else {
    bottoms.push(+input[i]);
  }
}

function solution(N, H, tops, bottoms) {
  tops = tops.sort((a, b) => a - b);
  bottoms = bottoms.sort((a, b) => a - b);
  const bottomCounts = new Map();
  bottoms.forEach((bottom) => {
    bottomCounts.set(bottom, (bottomCounts.get(bottom) || 0) + 1);
  });
  const topCounts = new Map();
  tops.forEach((top) => {
    topCounts.set(top, (topCounts.get(top) || 0) + 1);
  });
  let counts = new Array(H + 1).fill(0);

  let idx = 0;
  let h = bottoms[idx];
  for (let i = 1; i <= H; i++) {
    counts[i] += bottoms.length - idx;
    if (i === h) {
      idx += bottomCounts.get(h);
      h = bottoms[idx];
      if (idx === bottoms.length) {
        break;
      }
    }
  }

  idx = 0;
  h = tops[idx];
  for (let i = H; i >= 1; i--) {
    counts[i] += tops.length - idx;
    if (i === H - h + 1) {
      idx += topCounts.get(h);
      h = tops[idx];
      if (idx === tops.length) {
        break;
      }
    }
  }

  counts = counts.slice(1);
  let min = Math.min(...counts);
  const minCount = counts.filter((count) => count === min).length;

  return [min, minCount].join(' ');
}

console.log(solution(N, H, tops, bottoms));
