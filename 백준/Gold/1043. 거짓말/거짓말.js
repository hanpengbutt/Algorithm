let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const [K, ...truthPeople] = input[1].split(' ').map(Number);
const party = input.slice(2).map((p) => p.split(' ').map(Number));

function solution(N, M, K, truthPeople, party) {
  const arr = [];

  if (K === 0) return M;
  if (K === N) return 0;

  party.forEach((p) => {
    const [count, ...people] = p;
    const map = new Map();
    for (let i = 0; i < count; i++) {
      map.set(people[i], 1);
    }
    arr.push(map);
  });

  function s() {
    let nextTruthPeople = [];

    arr.forEach((map, idx) => {
      if (arr[idx]) {
        for (let i = 0; i < truthPeople.length; i++) {
          if (map.get(truthPeople[i])) {
            arr[idx] = 0;
            nextTruthPeople.push(
              ...[...map.keys()].filter((v) => !truthPeople.includes(v))
            );
            break;
          }
        }
      }
    });

    truthPeople = nextTruthPeople;
  }

  while (truthPeople.length !== 0) {
    s();
  }

  return arr.filter((map) => map !== 0).length;
}

console.log(solution(N, M, K, truthPeople, party));
