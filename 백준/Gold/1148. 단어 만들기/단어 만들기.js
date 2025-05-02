let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const dict = new Map();
const puzzles = [];
let flag = 0;

input.forEach((v) => {
  if (v === '-') {
    flag = 1;
  } else if (flag === 0) {
    const word = new Map();
    v.split('').forEach((a) => {
      word.set(a, (word.get(a) || 0) + 1);
    });
    dict.set(v, word);
  } else if (flag === 1 && v !== '#') {
    const puzzle = new Map();
    v.split('').forEach((a) => {
      puzzle.set(a, (puzzle.get(a) || 0) + 1);
    });
    puzzles.push(puzzle);
  }
});

function solution(puzzle) {
  let minCount = 200_000;
  let min = [];
  let maxCount = 0;
  let max = [];

  for (let center of puzzle.keys()) {
    let count = 0;
    for (let word of dict.values()) {
      if (word.get(center)) {
        // 중간 알파벳이 포함된 단어인 경우
        let flag = 1;
        for (let a of word.keys()) {
          if (!(puzzle.get(a) >= word.get(a))) {
            flag = 0;
            break;
          }
        }
        if (flag) count += 1;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      max = [center];
    } else if (count === maxCount) {
      max.push(center);
    }

    if (count < minCount) {
      minCount = count;
      min = [center];
    } else if (count === minCount) {
      min.push(center);
    }
  }

  return `${min.sort().join('')} ${minCount} ${max
    .sort()
    .join('')} ${maxCount}`;
}

puzzles.forEach((puzzle) => {
  console.log(solution(puzzle));
});
