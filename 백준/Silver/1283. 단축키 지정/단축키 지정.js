let fs = require('fs');
let [N, ...options] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
options = options.map((option) => option.split(' '));

function solution(N, options) {
  const result = [];
  const map = new Map();

  options.forEach((option) => {
    let flag = 0;
    for (let i = 0; i < option.length; i++) {
      const word = option[i];
      if (!map.get(word[0].toUpperCase())) {
        map.set(word[0].toUpperCase(), 1);
        flag = 1;
        result.push(
          option
            .map((word, idx) =>
              idx === i ? `[${word[0]}]${word.slice(1)}` : word
            )
            .join(' ')
        );
        break;
      }
    }

    if (flag === 0) {
      const alphabets = option.join(' ');
      for (let i = 0; i < alphabets.length; i++) {
        const alphabet = alphabets[i];
        if (alphabet !== ' ' && !map.get(alphabet.toUpperCase())) {
          map.set(alphabet.toUpperCase(), 1);
          flag = 1;
          result.push(
            alphabets
              .split('')
              .map((alphabet, idx) => (idx === i ? `[${alphabet}]` : alphabet))
              .join('')
          );
          break;
        }
      }
    }

    if (flag === 0) result.push(option.join(' '));
  });
  
  return result.join('\n');
}

console.log(solution(N, options));
