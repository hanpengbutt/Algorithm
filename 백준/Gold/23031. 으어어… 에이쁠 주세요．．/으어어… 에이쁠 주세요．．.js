let fs = require('fs');
let [N, A, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
A = A.split('');
input = input.map((row) => row.split(''));

function solution(N, A, input) {
  // [[아리, 좀비, 스위치], 스위치가 켜져있는지 여부]
  const matrix = new Array(N)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => [new Array(3).fill(0), 0]));
  let ari = [0, 0, 0];
  const zombies = [];
  const vector = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];
  const lightVector = [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  matrix[0][0][0][0] = 1;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (input[row][col] === 'S') {
        matrix[row][col][0][2] = 1;
      } else if (input[row][col] === 'Z') {
        zombies.push([row, col, 0]);
        matrix[row][col][0][1] = 1;
      }
    }
  }

  for (let i = 0; i < A.length; i++) {
    // 아리 이동
    let row, col, dir;
    switch (A[i]) {
      case 'F':
        [row, col, dir] = ari;
        const [dr, dc] = vector[dir];
        const nextRow = row + dr;
        const nextCol = col + dc;
        if (-1 < nextRow && nextRow < N && -1 < nextCol && nextCol < N) {
          matrix[row][col][0][0] = 0;
          matrix[nextRow][nextCol][0][0] = 1;
          ari = [nextRow, nextCol, dir];

          if (matrix[nextRow][nextCol][0][2]) {
            // 스위치가 있는 경우
            lightVector.forEach(([lightDr, lightDc]) => {
              const lightRow = nextRow + lightDr;
              const lightCol = nextCol + lightDc;
              if (
                -1 < lightRow &&
                lightRow < N &&
                -1 < lightCol &&
                lightCol < N
              ) {
                matrix[lightRow][lightCol][1] = 1;
              }
            });
          } else if (
            !matrix[nextRow][nextCol][1] &&
            matrix[nextRow][nextCol][0][1]
          ) {
            // 스위치가 켜져있지 않을 때 좀비가 있다면
            return 'Aaaaaah!';
          }
        }
        break;
      case 'L':
        [row, col, dir] = ari;
        dir = (dir + 3) % 4;
        ari = [row, col, dir];
        break;
      case 'R':
        [row, col, dir] = ari;
        dir = (dir + 1) % 4;
        ari = [row, col, dir];
        break;
    }

    // 좀비 이동
    for (let j = 0; j < zombies.length; j++) {
      let zombie = zombies[j];
      let [row, col, dir] = zombie;
      const [dr, dc] = vector[dir];
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (-1 < nextRow && nextRow < N && -1 < nextCol && nextCol < N) {
        matrix[row][col][0][1] = 0;
        matrix[nextRow][nextCol][0][1] = 1;
        zombies[j] = [nextRow, nextCol, dir];

        if (!matrix[nextRow][nextCol][1] && matrix[nextRow][nextCol][0][0]) {
          // 스위치가 켜져있지 않을 때 아리가 있다면
          return 'Aaaaaah!';
        }
      } else {
        dir = (dir + 2) % 4;
        zombies[j] = [row, col, dir];
      }
    }
  }

  return 'Phew...';
}

console.log(solution(N, A, input));
