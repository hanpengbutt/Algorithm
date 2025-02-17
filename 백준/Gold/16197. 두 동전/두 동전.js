let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const board = input.slice(1).map((row) => row.split(''));

function solution(N, M, board) {
  let result = -1;
  let coin1;
  let coin2;
  const walls = [];
  const vector = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'o') {
        if (coin1) {
          coin2 = [i, j];
        } else {
          coin1 = [i, j];
        }
      } else if (board[i][j] === '#') {
        walls.push([i, j]);
      }
    }
  }

  function move(idx, coin1, coin2) {
    if (idx > 10) return;

    const isCoin1Falled =
      coin1[0] < 0 || coin1[0] > N - 1 || coin1[1] < 0 || coin1[1] > M - 1;
    const isCoin2Falled =
      coin2[0] < 0 || coin2[0] > N - 1 || coin2[1] < 0 || coin2[1] > M - 1;

    if (isCoin1Falled && isCoin2Falled) {
      return;
    } else if (isCoin1Falled || isCoin2Falled) {
      result = Math.min(result === -1 ? Infinity : result, idx);
      return;
    }

    vector.forEach(([dr, dc]) => {
      let newCoin1 = [coin1[0] + dr, coin1[1] + dc];
      if (
        walls.filter(
          (wall) => wall[0] === newCoin1[0] && wall[1] === newCoin1[1]
        ).length !== 0
      ) {
        newCoin1 = coin1;
      }

      let newCoin2 = [coin2[0] + dr, coin2[1] + dc];
      if (
        walls.filter(
          (wall) => wall[0] === newCoin2[0] && wall[1] === newCoin2[1]
        ).length !== 0
      ) {
        newCoin2 = coin2;
      }

      if (newCoin1 !== coin1 || newCoin2 !== coin2) {
        move(idx + 1, newCoin1, newCoin2);
      }
    });
  }

  move(0, coin1, coin2);

  return result;
}

console.log(solution(N, M, board));
