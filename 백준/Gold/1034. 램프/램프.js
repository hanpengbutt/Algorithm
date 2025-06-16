let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, _] = input[0].split(' ').map(Number);
const lamps = input.slice(1, N + 1).map((lamp) => lamp.split('').map(Number));
const K = +input[input.length - 1];

function solution(lamps, K) {
  const map = new Map();
  lamps.forEach((lamp) => {
    let turnCount = lamp.map((v) => (v === 0 ? 1 : 0));
    const sumTurnCount = turnCount.reduce((acc, cur) => (acc += cur));
    if (sumTurnCount <= K && (K - sumTurnCount) % 2 === 0) {
      turnCount = turnCount.join('');
      map.set(turnCount, (map.get(turnCount) || 0) + 1);
    }
  });

  console.log(map.size ? Math.max(...map.values()) : 0);
}

solution(lamps, K);
