let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map((v) => +v);
const words = input.slice(1);

function solution(N, K, words) {
  let result = 0;
  if (K < 5) return 0;
  if (K > 25) return N;

  const learn = ['a', 'c', 'i', 'n', 't'];
  const alphabet = new Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(i + 97))
    .filter((v) => !learn.includes(v));

  for (let i = 0; i < 1 << alphabet.length; i++) {
    const newLearn = [...learn];
    for (let j = 0; j < alphabet.length; j++) {
      if (i & (1 << j)) {
        newLearn.push(alphabet[j]);
      }
    }

    if (newLearn.length === K) {
      let count = 0;

      words.forEach((word) => {
        const newWord = word.slice(4, -4);
        let canLearn = true;
        for (let i = 0; i < newWord.length; i++) {
          if (!newLearn.includes(newWord[i])) {
            canLearn = false;
            break;
          }
        }
        if (canLearn) count += 1;
      });

      if (count > result) result = count;
    }
  }

  return result;
}

console.log(solution(N, K, words));
