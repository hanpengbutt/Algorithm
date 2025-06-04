let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const pills = input.slice(1, 1 + N).map((pill) => pill.split(' ').map(Number));
const R = +input[N + 1];
const diseases = input
  .slice(N + 2)
  .map((disease) => disease.split(' ').map(Number));

function solution(N, R, pills, diseases) {
  const answer = [];
  const map = new Map(pills);

  diseases.forEach((disease) => {
    let result = [];
    for (let i = 1; i < disease.length; i++) {
      if (map.get(disease[i]) !== undefined) {
        result.push(map.get(disease[i]));
      } else {
        answer.push('YOU DIED');
        break;
      }
    }

    if (result.length === disease.length - 1) answer.push(result.join(' '));
  });

  return answer.join('\n');
}

console.log(solution(N, R, pills, diseases));
