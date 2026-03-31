const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, energy] = input[0].split(' ').map((v) => +v);
const matrix = input
  .slice(1, N + 1)
  .map((row) => row.split(' ').map((v) => +v));
const [start_row, start_col] = input[N + 1].split(' ').map((v) => +v);
const customers = input
  .slice(N + 2)
  .map((customer) => customer.split(' ').map((v) => +v));

function solution(N, M, energy, start_row, start_col, customers) {
  let result = energy;
  let row = start_row - 1;
  let col = start_col - 1;
  const map = new Map();

  customers.forEach(([s_row, s_col, e_row, e_col]) => {
    matrix[s_row - 1][s_col - 1] = 2;
    map.set(`${s_row - 1} ${s_col - 1}`, [e_row - 1, e_col - 1]);
  });

  function findCustomer(row, col) {
    if (matrix[row][col]) {
      const [e_row, e_col] = map.get(`${row} ${col}`);
      return [row, col, e_row, e_col, 0];
    }

    const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
    const vector = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const queue = [[row, col]];
    visited[row][col] = 1;
    let idx = 0;
    let min_distance = Infinity;
    const next_customers = [];

    while (idx < queue.length) {
      const [now_row, now_col] = queue[idx++];
      if (visited[now_row][now_col] >= min_distance) break;

      vector.forEach(([dr, dc]) => {
        const next_row = now_row + dr;
        const next_col = now_col + dc;

        if (
          -1 < next_row &&
          next_row < N &&
          -1 < next_col &&
          next_col < N &&
          !visited[next_row][next_col] &&
          matrix[next_row][next_col] !== 1
        ) {
          visited[next_row][next_col] = visited[now_row][now_col] + 1;
          if (matrix[next_row][next_col] === 0) {
            queue.push([next_row, next_col]);
          } else if (matrix[next_row][next_col] === 2) {
            min_distance = visited[next_row][next_col];
            next_customers.push([next_row, next_col]);
          }
        }
      });
    }

    if (next_customers.length) {
      const customer = next_customers.sort(
        (a, b) => a[0] - b[0] || a[1] - b[1],
      )[0];
      const [s_row, s_col] = customer;
      const [e_row, e_col] = map.get(`${s_row} ${s_col}`);
      const count = visited[s_row][s_col] - 1;

      return [s_row, s_col, e_row, e_col, count];
    }

    return null;
  }

  function goEnd(s_row, s_col, e_row, e_col) {
    const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
    const vector = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const queue = [[s_row, s_col]];
    visited[s_row][s_col] = 1;
    let idx = 0;

    while (idx < queue.length) {
      const [now_row, now_col] = queue[idx++];

      for (const [dr, dc] of vector) {
        const next_row = now_row + dr;
        const next_col = now_col + dc;

        if (
          -1 < next_row &&
          next_row < N &&
          -1 < next_col &&
          next_col < N &&
          !visited[next_row][next_col] &&
          matrix[next_row][next_col] !== 1
        ) {
          visited[next_row][next_col] = visited[now_row][now_col] + 1;
          if (next_row === e_row && next_col === e_col) {
            return visited[next_row][next_col] - 1;
          }
          queue.push([next_row, next_col]);
        }
      }
    }

    return null;
  }

  for (let i = 0; i < M; i++) {
    const customer = findCustomer(row, col);
    if (!customer) return -1;

    const [s_row, s_col, e_row, e_col, count] = customer;
    result -= count;
    if (result <= 0) return -1;

    const goEndCount = goEnd(s_row, s_col, e_row, e_col);
    if (!goEndCount) return -1;

    result -= goEndCount;
    if (result < 0) return -1;
    result += goEndCount * 2;

    matrix[s_row][s_col] = 0;
    row = e_row;
    col = e_col;
  }

  return result;
}

console.log(solution(N, M, energy, start_row, start_col, customers));
