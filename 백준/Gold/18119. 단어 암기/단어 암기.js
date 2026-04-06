const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].split(' ').map((v) => +v);
const words = input.slice(1, 1 + N);
const queries = input.slice(1 + N);

function solution(N, M, words, queries) {
  const memorized = new Array(26).fill(1);
  const result = [];

  words = words.map((word) => {
    const newWord = new Array(26).fill(0);
    word.split('').forEach((alphabet) => {
      newWord[alphabet.charCodeAt() - 97] = 1;
    });
    return parseInt(newWord.join(''), 2);
  });

  queries.forEach((query) => {
    const [q, x] = query.split(' ');

    if (q === '1') {
      memorized[x.charCodeAt() - 97] = 0;
    } else {
      memorized[x.charCodeAt() - 97] = 1;
    }

    const m = parseInt(memorized.join(''), 2);

    result.push(words.filter((word) => (word & m) === word).length);
  });

  return result.join('\n');
}

console.log(solution(N, M, words, queries));
