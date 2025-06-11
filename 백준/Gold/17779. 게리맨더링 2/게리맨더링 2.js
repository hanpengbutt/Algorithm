let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map(Number));

function solution() {
  let result = Infinity;

  for (x = 1; x <= N - 2; x++) {
    for (y = 2; y <= N - 1; y++) {
      let d1 = 1;
      while (y - d1 >= 1) {
        let d2 = 1;
        while (x + d1 + d2 <= N && y + d2 <= N) {
          const diff = getDiff(x, y, d1, d2);
          if (diff < result) result = diff;
          d2++;
        }
        d1++;
      }
    }
  }

  function getDiff(x, y, d1, d2) {
    const regions = new Array(N).fill(0).map(() => new Array(N).fill(0));
    let counts = new Array(5).fill(0);

    // 5번 선거구
    const bounds = [];
    for (let i = 0; i <= d1; i++) {
      regions[x + i - 1][y - i - 1] = 5;
      counts[4] += matrix[x + i - 1][y - i - 1];
      bounds.push([x + i - 1, y - i - 1]);
    }
    bounds.pop();
    for (let i = 0; i <= d2; i++) {
      if (!regions[x + i - 1][y + i - 1]) {
        regions[x + i - 1][y + i - 1] = 5;
        counts[4] += matrix[x + i - 1][y + i - 1];
        bounds.push([x + i - 1, y + i - 1]);
      }
    }
    bounds.pop();
    for (let i = 0; i <= d2; i++) {
      if (!regions[x + d1 + i - 1][y - d1 + i - 1]) {
        regions[x + d1 + i - 1][y - d1 + i - 1] = 5;
        counts[4] += matrix[x + d1 + i - 1][y - d1 + i - 1];
      }
    }
    for (let i = 0; i <= d1; i++) {
      if (!regions[x + d2 + i - 1][y + d2 - i - 1]) {
        regions[x + d2 + i - 1][y + d2 - i - 1] = 5;
        counts[4] += matrix[x + d2 + i - 1][y + d2 - i - 1];
      }
    }

    bounds.forEach(([row, col]) => {
      let i = 1;
      while (!regions[row + i][col]) {
        regions[row + i][col] = 5;
        counts[4] += matrix[row + i][col];
        i++;
      }
    });

    // 1번 선거구
    for (let r = 1; r < x + d1; r++) {
      for (let c = 1; c <= y; c++) {
        if (regions[r - 1][c - 1]) break;
        counts[0] += matrix[r - 1][c - 1];
        regions[r - 1][c - 1] = 1;
      }
    }

    // 2번 선거구
    for (let r = 1; r <= x + d2; r++) {
      for (let c = N; c > y; c--) {
        if (regions[r - 1][c - 1]) break;
        counts[1] += matrix[r - 1][c - 1];
        regions[r - 1][c - 1] = 2;
      }
    }

    // 3번 선거구
    for (let r = x + d1; r <= N; r++) {
      for (let c = 1; c < y - d1 + d2; c++) {
        if (regions[r - 1][c - 1]) break;
        counts[2] += matrix[r - 1][c - 1];
        regions[r - 1][c - 1] = 3;
      }
    }

    // 4번 선거구
    for (let r = x + d2 + 1; r <= N; r++) {
      for (let c = N; c >= y - d1 + d2; c--) {
        if (regions[r - 1][c - 1]) break;
        counts[3] += matrix[r - 1][c - 1];
        regions[r - 1][c - 1] = 4;
      }
    }
    
    return Math.max(...counts) - Math.min(...counts);
  }

  return result;
}

console.log(solution());
