let fs = require('fs');
let [N, cranes, M, boxes] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

N = +N;
cranes = cranes.split(' ').map(Number);
M = +M;
boxes = boxes.split(' ').map(Number);

function solution(N, M, cranes, boxes) {
  let result = 0;

  // 각 크레인이 옮길 수 있는 박스의 무게 및 개수를 map 객체 형태로 나타낸 요소들의 배열
  const possibleBoxes = new Array(N).fill(0).map(() => new Map([]));
  // 각 크레인이 옮길 수 있는 박스의 개수를 나타낸 요소들의 배열
  const possibleBoxesCount = new Array(N).fill(0);

  cranes.sort((a, b) => a - b);
  boxes.sort((a, b) => b - a);

  if (Math.max(...boxes) > Math.max(...cranes)) return -1;

  for (let i = 0; i < M; i++) {
    const box = boxes[i];
    for (let j = 0; j < N; j++) {
      const crane = cranes[j];
      if (crane >= box) {
        possibleBoxes[j].set(box, (possibleBoxes[j].get(box) || 0) + 1);
        possibleBoxesCount[j]++;
      }
    }
  }

  while (possibleBoxesCount.reduce((acc, cur) => (acc += cur))) {
    for (let i = N - 1; i > -1; i--) {
      const box = possibleBoxes[i].keys().next().value;
      for (let j = 0; j < N; j++) {
        if (possibleBoxesCount[j] && possibleBoxes[j].get(box)) {
          if (possibleBoxes[j].get(box) === 1) {
            possibleBoxes[j].delete(box);
          } else {
            possibleBoxes[j].set(box, possibleBoxes[j].get(box) - 1);
          }
          possibleBoxesCount[j]--;
        }
      }
    }

    result++;
  }

  return result;
}

console.log(solution(N, M, cranes, boxes));
