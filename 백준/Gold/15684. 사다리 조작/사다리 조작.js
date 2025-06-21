let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, _, H] = input[0].split(' ').map(Number);
const widths = input.slice(1).map((width) => width.split(' ').map(Number));

function solution(N, H, widths) {
  const ladder = new Array(N - 1).fill(0).map(() => new Array(H).fill(0));

  for (let [a, b] of widths) {
    ladder[b - 1][a - 1] = 1;
  }

  function isPossible(ladder) {
    for (let i = 0; i < N; i++) {
      let width = i;
      let height = H;

      while (height > 0) {
        if (width - 1 > -1 && ladder[width - 1][H - height]) {
          width--;
        } else if (width < N - 1 && ladder[width][H - height]) {
          width++;
        }
        height--;
      }

      if (i !== width) {
        return false;
      }
    }

    return true;
  }

  if (isPossible(ladder)) return 0;

  let result = -1;
  let options = new Array(3).fill(0).map(() => []);

  function select(idx, selected) {
    options[idx - 1].push(selected);

    if (idx === 3) {
      return;
    }

    for (let j = selected[idx - 1] + 1; j < (N - 1) * H; j++) {
      const [x, y] = [~~(j / H), j % H];
      if (
        !ladder[x][y] &&
        !(x - 1 > -1 && ladder[x - 1][y]) &&
        !(x + 1 < N - 1 && ladder[x + 1][y])
      ) {
        select(idx + 1, [...selected, j]);
      }
    }
  }

  for (let i = 0; i < (N - 1) * H; i++) {
    const [x, y] = [~~(i / H), i % H];
    if (
      !ladder[x][y] &&
      !(x - 1 > -1 && ladder[x - 1][y]) &&
      !(x + 1 < N - 1 && ladder[x + 1][y])
    ) {
      select(1, [i]);
    }
  }

  options = options.flat();

  for (let option of options) {
    const newLadder = [...ladder.map((v) => [...v])];

    for (let pos of option) {
      const [x, y] = [~~(pos / H), pos % H];
      newLadder[x][y] = 1;
    }

    if (isPossible(newLadder)) {
      result = option.length;
      return result;
    }
  }

  return result;
}

console.log(solution(N, H, widths));
