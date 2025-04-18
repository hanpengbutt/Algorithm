let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, B] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((row) => row.split(' ').map(Number));

function solution(N, M, B, matrix) {
  let resultTime = Infinity;
  let resultHeight = -Infinity;

  let minHeight = Math.min(...matrix.map((row) => Math.min(...row)));
  let maxHeight = Math.max(...matrix.map((row) => Math.max(...row)));

  if (minHeight === maxHeight) return `0 ${minHeight}`;

  function getTime(goalHeight) {
    let count = B;
    let time = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        const nowHeight = matrix[row][col];
        if (nowHeight > goalHeight) {
          // 목표 높이보다 높다면, 블록 제거
          time += (nowHeight - goalHeight) * 2;
          count += nowHeight - goalHeight;
        } else if (matrix[row][col] < goalHeight) {
          // 목표 높이보다 낮다면, 블록 추가
          time += goalHeight - nowHeight;
          count -= goalHeight - nowHeight;
        }
      }
    }

    return count >= 0 ? time : false;
  }

  for (let goalHeight = minHeight; goalHeight <= maxHeight; goalHeight++) {
    const time = getTime(goalHeight);
    if (time) {
      if (time < resultTime) {
        resultTime = time;
        resultHeight = goalHeight;
      } else if (time === resultTime && resultHeight < goalHeight) {
        resultHeight = goalHeight;
      }
    } else {
      // 더 높은 높이가 불가능함
      break;
    }
  }

  return `${resultTime} ${resultHeight}`;
}

console.log(solution(N, M, B, matrix));

