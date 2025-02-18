let fs = require('fs');
let matrix = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.split(''));

function solution(matrix) {
  let result = 0;

  function isConnected(selected) {
    const visited = new Array(5).fill(1).map(() => new Array(5).fill(1));
    selected.forEach((s) => {
      visited[s[0]][s[1]] = 0;
    });
    const vector = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    let count = 1;
    function dfs(nowRow, nowCol) {
      visited[nowRow][nowCol] = 1;
      vector.forEach((v) => {
        const [dr, dc] = v;
        const nextRow = nowRow + dr;
        const nextCol = nowCol + dc;

        if (
          -1 < nextRow &&
          nextRow < 5 &&
          -1 < nextCol &&
          nextCol < 5 &&
          !visited[nextRow][nextCol]
        ) {
          count += 1;
          dfs(nextRow, nextCol);
        }
      });
    }

    dfs(selected[0][0], selected[0][1]);

    return count === 7;
  }

  function select(idx, selected, yCount) {
    if (yCount > 3 || selected.length + 25 - idx < 7 || selected.length > 7) {
      return;
    }

    if (idx === 25) {
      if (isConnected(selected)) {
        result += 1;
      }
      return;
    }

    const newSelected = [...selected];
    newSelected.push([~~(idx / 5), idx % 5]);

    select(idx + 1, selected, yCount);
    select(
      idx + 1,
      newSelected,
      matrix[~~(idx / 5)][idx % 5] === 'Y' ? yCount + 1 : yCount
    );
  }


  select(0, [], 0);

  return result;
}

console.log(solution(matrix));
