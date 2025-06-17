let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, _, K] = input[0].split(' ').map(Number);
const A = input.slice(1, 1 + N).map((row) => row.split(' ').map(Number));
const trees = input.slice(1 + N).map((tree) => tree.split(' ').map(Number));

function solution(N, K, A, trees) {
  const matrix = new Array(N)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => [[], 5]));

  for (let [x, y, z] of trees) {
    matrix[x - 1][y - 1][0].push(z);
  }

  const vector = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // 봄: 각 칸에 대해 나이가 어린 나무부터 나이만큼 양분을 먹고 나이 1증가, 양분이 부족한 경우 죽음
  // 여름: 봄에 죽은 나무의 나이를 2로 나눈 값(소수점 버림)만큼 나무가 있던 칸의 양분으로 추가
  // 가을: 나무의 나이가 5의 배수인 경우 인점한 8개의 칸에 나이가 1인 나무가 번식
  // 겨울: 땅에 A[r][c]만큼의 양분 추가

  for (let i = 0; i < K; i++) {
    for (let row of matrix) {
      for (let cell of row) {
        const newTree = [];
        let nutrient = 0;

        for (let i = cell[0].length - 1; i > -1; i--) {
          const age = cell[0][i];
          if (cell[1] >= age) {
            cell[1] -= age;
            newTree.push(age + 1);
          } else {
            nutrient += ~~(age / 2);
          }
        }
        cell[0] = newTree.reverse();
        cell[1] += nutrient;
      }
    }

    matrix.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        for (let age of cell[0]) {
          if (age % 5 === 0) {
            for (let [dr, dc] of vector) {
              if (
                -1 < rowIdx + dr &&
                rowIdx + dr < N &&
                -1 < colIdx + dc &&
                colIdx + dc < N
              ) {
                matrix[rowIdx + dr][colIdx + dc][0].push(1);
              }
            }
          }
        }
        cell[1] += A[rowIdx][colIdx];
      });
    });
  }

  let result = 0;
  for (let row of matrix) {
    for (let cell of row) {
      result += cell[0].length;
    }
  }

  return result;
}

console.log(solution(N, K, A, trees));
