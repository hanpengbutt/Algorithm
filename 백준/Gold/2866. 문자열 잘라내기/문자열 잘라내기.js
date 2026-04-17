const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [R, C] = input[0].split(' ').map((v) => +v);
const matrix = input.slice(1);

function solution(R, C, matrix) {
  const strings = [];
  for (let col = 0; col < C; col++) {
    const string = [];
    for (let row = 0; row < R; row++) {
      string.push(matrix[row][col]);
    }
    strings.push(string);
  }

  function getSames(idxs, row, suffix = '') {
    const map = new Map();
    for (const idx of idxs) {
      const str = strings[idx][row] + suffix;
      if (map.has(str)) {
        map.set(str, [...map.get(str), idx]);
      } else {
        map.set(str, [idx]);
      }
    }

    const sames = new Map();
    for (const [str, idxs] of map) {
      if (idxs.length > 1) {
        sames.set(str, idxs);
      }
    }

    return sames;
  }

  let sames = getSames(
    new Array(C).fill(0).map((_, i) => i),
    R - 1,
  );

  if (!sames.size) return R - 1;

  for (let i = 1; i < R; i++) {
    const row = R - i - 1;

    if (sames.size) {
      const new_sames = [];
      for (const [str, idxs] of sames) {
        new_sames.push(...getSames(idxs, row, str));
      }
      sames = new Map(new_sames);
    } else {
      return row + 1;
    }
  }

  return 0;
}

console.log(solution(R, C, matrix));
