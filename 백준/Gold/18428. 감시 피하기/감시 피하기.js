let fs = require('fs');
let [N, ...matrix] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
matrix = matrix.map((row) => row.split(' '));

function solution(N, matrix) {
  let result = 'NO';

  // 빈 칸, 선생님들의 위치 정보
  const empty = [];
  const teacher = [];
  matrix.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === 'X') {
        empty.push(rowIdx * N + colIdx);
      } else if (val === 'T') {
        teacher.push(rowIdx * N + colIdx);
      }
    });
  });

  // 선생님들의 상, 하, 좌, 우에 대해 학생을 감시하는 함수
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  function search(selected) {
    for (let i = 0; i < teacher.length; i++) {
      const row = ~~(teacher[i] / N);
      const col = teacher[i] % N;
      for (let j = 0; j < vector.length; j++) {
        let [r, c] = vector[j];
        let dr = (dc = 0);
        while (1) {
          dr += r;
          dc += c;
          if (-1 < row + dr && row + dr < N && -1 < col + dc && col + dc < N) {
            if (selected.includes((row + dr) * N + col + dc)) break;
            if (matrix[row + dr][col + dc] === 'S') {
              return;
            }
          } else {
            break;
          }
        }
      }
    }

    result = 'YES';
  }

  // 빈 칸 중 3칸을 고르는 함수
  function select(idx, selected) {
    if (idx === empty.length) {
      if (selected.length === 3) search(selected);

      return;
    }

    if (selected.length > 3) {
      return;
    }

    select(idx + 1, [...selected, empty[idx]]);
    select(idx + 1, selected);
  }
  select(0, []);

  return result;
}

console.log(solution(N, matrix));
