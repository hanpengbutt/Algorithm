let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' ').map(Number));

function solution(N, matrix) {
  let result = 0;
  let pos = [~~(N / 2), ~~(N / 2)]; // 토네이도의 위치: x
  const vector = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]; // 토네이도의 방향: 왼쪽, 아래, 오른쪽, 위 순서
  const sands = [
    [
      (sand) => [-1, 0, sand * 0.01],
      (sand) => [1, 0, sand * 0.01],
      (sand) => [-1, -1, sand * 0.07],
      (sand) => [1, -1, sand * 0.07],
      (sand) => [-2, -1, sand * 0.02],
      (sand) => [2, -1, sand * 0.02],
      (sand) => [-1, -2, sand * 0.1],
      (sand) => [1, -2, sand * 0.1],
      (sand) => [0, -3, sand * 0.05],
    ],
    [
      (sand) => [0, -1, sand * 0.01],
      (sand) => [0, 1, sand * 0.01],
      (sand) => [1, -1, sand * 0.07],
      (sand) => [1, 1, sand * 0.07],
      (sand) => [1, -2, sand * 0.02],
      (sand) => [1, 2, sand * 0.02],
      (sand) => [2, -1, sand * 0.1],
      (sand) => [2, 1, sand * 0.1],
      (sand) => [3, 0, sand * 0.05],
    ],
    [
      (sand) => [-1, 0, sand * 0.01],
      (sand) => [1, 0, sand * 0.01],
      (sand) => [-1, 1, sand * 0.07],
      (sand) => [1, 1, sand * 0.07],
      (sand) => [-2, 1, sand * 0.02],
      (sand) => [2, 1, sand * 0.02],
      (sand) => [-1, 2, sand * 0.1],
      (sand) => [1, 2, sand * 0.1],
      (sand) => [0, 3, sand * 0.05],
    ],
    [
      (sand) => [0, -1, sand * 0.01],
      (sand) => [0, 1, sand * 0.01],
      (sand) => [-1, -1, sand * 0.07],
      (sand) => [-1, 1, sand * 0.07],
      (sand) => [-1, -2, sand * 0.02],
      (sand) => [-1, 2, sand * 0.02],
      (sand) => [-2, -1, sand * 0.1],
      (sand) => [-2, 1, sand * 0.1],
      (sand) => [-3, 0, sand * 0.05],
    ],
  ]; // 모래: [dr, dc, 모래의 양]

  const dir = [];
  let i = 0;
  while (dir.length < N ** 2) {
    for (j = 0; j < ~~(i / 2) + 1; j++) {
      dir.push(i % 4);
    }
    i++;
  }
  dir.pop();

  for (let d of dir) {
    let sum = 0;
    const [dr, dc] = vector[d];
    for (let f of sands[d]) {
      let [sandDr, sandDc, sand] = f(matrix[pos[0] + dr][pos[1] + dc]);
      sand = ~~sand;
      sum += sand;
      let row = pos[0] + sandDr;
      let col = pos[1] + sandDc;
      if (-1 < row && row < N && -1 < col && col < N) {
        matrix[row][col] += sand;
      } else {
        result += sand;
      }
    }

    let row = pos[0] + dr * 2;
    let col = pos[1] + dc * 2;
    let sand = matrix[pos[0] + dr][pos[1] + dc] - sum;
    if (-1 < row && row < N && -1 < col && col < N) {
      matrix[row][col] += sand;
    } else {
      result += sand;
    }

    matrix[pos[0]][pos[1]] = 0;
    pos = [pos[0] + dr, pos[1] + dc];
  }

  return result;
}

console.log(solution(N, matrix));
