let fs = require('fs');
let [X, word] = fs.readFileSync(0, 'utf8').trim().split('\n');
X = +X;

function solution(X, word) {
  word = word.split('');
  let map = new Map();

  let prevWord = [...word];
  let newWord = [...word];

  let i = 1;
  while (!map.get(newWord.join(''))) {
    map.set(newWord.join(''), i++);
    prevWord = newWord;

    let front = [];
    let back = [];
    for (let i = 0; i < word.length; i++) {
      if (i % 2) {
        back.push(prevWord[i]);
      } else {
        front.push(prevWord[i]);
      }
    }
    newWord = front.concat(back.reverse());
  }

  return [...map.keys()][X % map.size];
}

console.log(solution(X, word));
