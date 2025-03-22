let fs = require('fs');
let [N, input] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
input = input.split(' ').map(Number);

function solution(N, input) {
  const result = new Array(N).fill(0);

  input.forEach((v, num) => {
    let count = 0
    for(let i = 0; i < N; i++) {
        if(count === v && !result[i]) {
            result[i] = num + 1
            break
        }

        if(!result[i]) {
            count += 1
        }
    }
  });


  return result.join(' ');
}

console.log(solution(N, input));
