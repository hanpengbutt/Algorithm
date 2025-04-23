let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').split('\n');

// n: 트럭의 개수, w: 다리의 길이, L: 다리의 최대 하중
const [n, w, L] = input[0].split(' ').map(Number);
// 각 트럭의 무게
const weights = input[1].split(' ').map(Number);

function solution(n, w, L, weights) {
  let time = 0; // 시간
  let totalWeight = 0; // 현재 다리 위에 올라간 트럭들의 무게의 합
  let totalCount = 0; // 현재 다리 위에 올라간 트럭들의 개수
  let trucks = []; // 현재 다리 위에 올라간 트럭들의 무게, 위치 정보를 담은 배열
  let idx = 0; // 다리 위에 올라가기 위해 대기하고 있는 트럭의 인덱스

  while (idx < n) {
    time += 1;

    // 현재 다리 위에 올라간 트럭들의 이동
    const newTrucks = [];
    trucks.forEach((truck) => {
      const [weight, position] = truck;
      if (position === w) {
        totalCount -= 1;
        totalWeight -= weight;
      } else {
        newTrucks.push([weight, position + 1]);
      }
    });
    trucks = newTrucks;

    // 다리 위에 다음 트럭이 올라갈 수 있을 때
    // => '현재 총 트럭 개수 + 1 <= 다리 길이' 이고 '현재 총 무게의 합 + 다음 트럭 무게 <= 다리의 최대 하중'
    if (totalCount + 1 <= w && totalWeight + weights[idx] <= L) {
      trucks.push([weights[idx], 1]);
      totalCount += 1;
      totalWeight += weights[idx];
      idx += 1;
    }
  }

  // time: 마지막 트럭이 다리에 올라온 시간
  // => 총 걸리는 시간: time + w(마지막 트럭이 다리를 건너는데 걸리는 시간)
  return time + w;
}

console.log(solution(n, w, L, weights));
