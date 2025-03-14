let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const fires = input.slice(1).map((fire) => fire.split(' ').map(Number));

function solution(N, M, K, fires) {
  let matrix = new Array(N)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => []));
  let firePositions = [];
  const vector = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  // 초기 파이어볼 위치 정보
  fires.forEach((fire) => {
    const [r, c, m, s, d] = fire;
    matrix[r - 1][c - 1].push([m, s, d]);
    firePositions.push(N * (r - 1) + c - 1);
  });

  // K번 명령
  for (let i = 0; i < K; i++) {
    const newMatrix = new Array(N)
      .fill(0)
      .map(() => new Array(N).fill(0).map(() => []));
    const newFirePositions = [];

    // 파이어볼 이동
    firePositions.forEach((position) => {
      const row = ~~(position / N);
      const col = position % N;

      matrix[row][col].forEach((fire) => {
        const [m, s, d] = fire;
        const [dr, dc] = vector[d];
        const modS = s % N;
        let nextRow = row + dr * modS;
        let nextCol = col + dc * modS;

        nextRow = nextRow >= 0 ? nextRow % N : nextRow + N;
        nextCol = nextCol >= 0 ? nextCol % N : nextCol + N;

        if (-1 < nextRow && nextRow < N && -1 < nextCol && nextCol < N) {
          newMatrix[nextRow][nextCol].push([m, s, d]);
          if (!newFirePositions.includes(N * nextRow + nextCol))
            newFirePositions.push(N * nextRow + nextCol);
        }
      });
    });

    // 2개 이상의 파이어볼이 있는 칸
    newFirePositions.forEach((position) => {
      const row = ~~(position / N);
      const col = position % N;
      const fires = newMatrix[row][col];

      if (fires.length > 1) {
        newMatrix[row][col] = [];
        const m = ~~(
          fires.map((fire) => fire[0]).reduce((acc, cur) => (acc += cur)) / 5
        );

        if (m !== 0) {
          const s = ~~(
            fires.map((fire) => fire[1]).reduce((acc, cur) => (acc += cur)) /
            fires.length
          );
          const evenCount = fires.filter((fire) => fire[2] % 2 === 0).length;
          const directions =
            evenCount === 0 || evenCount === fires.length
              ? [0, 2, 4, 6]
              : [1, 3, 5, 7];

          directions.forEach((d) => {
            newMatrix[row][col].push([m, s, d]);
          });
        }
      }
    });

    matrix = newMatrix;
    firePositions = newFirePositions;
  }

  // 파이어볼 질량의 합
  let result = 0;
  matrix.forEach((row) => {
    row.forEach((fires) => {
      if (fires.length > 0) {
        result += fires
          .map((fire) => fire[0])
          .reduce((acc, cur) => (acc += cur));
      }
    });
  });

  return result;
}

console.log(solution(N, M, K, fires));
