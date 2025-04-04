let fs = require('fs');
let [N, ...words] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;

function solution(N, words) {
  words = [...new Set(words)].sort((a, b) => a.length - b.length);
  let result = words.length;

  for (let i = 0; i < words.length; i++) {
    const origin = words[i];
    for (let j = i + 1; j < words.length; j++) {
      const comp = words[j];
      let isPrefix = true;
      for (let k = 0; k < origin.length; k++) {
        if (origin[k] !== comp[k]) {
          isPrefix = false;
          break;
        }
      }
      if (isPrefix) {
        result -= 1;
        break;
      }
    }
  }

  return result;
}

console.log(solution(N, words));