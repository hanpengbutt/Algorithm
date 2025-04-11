let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const table = input[1].split('');

function solution(N, K, table) {
  let result = 0;
  for (let i = 0; i < table.length; i++) {
    if (table[i] === 'P') {
      for (let j = i - K; j <= i + K; j++) {
        if (table[j] === 'H') {
          table[j] = 0;
          result += 1;
          break;
        }
      }
    }
  }
  return result;
}

console.log(solution(N, K, table));
