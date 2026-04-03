const fs = require('fs');
const input = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map((v) => +v));

const matrix = input.slice(0, 5);
const numbers = input.slice(5).flat();

function solution(matrix, numbers) {
  const sets = new Array(12).fill(0).map(() => new Set());
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      sets[row].add(matrix[row][col]);
      sets[5 + col].add(matrix[row][col]);
      if (row === col) sets[10].add(matrix[row][col]);
      if (row + col === 4) sets[11].add(matrix[row][col]);
    }
  }

  let count = 0;

  for (const [idx, number] of numbers.entries()) {
    for (const set of sets) {
      if (set.size && set.has(number)) {
        set.delete(number);
        if (set.size === 0) count++;
      }
    }

    if (count >= 3) return idx + 1;
  }
}

console.log(solution(matrix, numbers));
