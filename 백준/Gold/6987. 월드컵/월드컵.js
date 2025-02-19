let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(input) {
  let result = [];

  function isPossible(matchResult) {
    let possible = false;

    function match(idx, currentResult) {
      if (possible) {
        return;
      }
      
      if (idx === 5) {
        for (let i = 0; i < 3; i++) {
          if (matchResult[0][i] !== currentResult[0][i]) {
            return;
          }
        }
      }

      if (idx === 9) {
        for (let i = 0; i < 3; i++) {
          if (matchResult[1][i] !== currentResult[1][i]) {
            return;
          }
        }
      }

      if (idx === 12) {
        for (let i = 0; i < 3; i++) {
          if (matchResult[2][i] !== currentResult[2][i]) {
            return;
          }
        }
      }

      if (idx === 14) {
        for (let i = 0; i < 3; i++) {
          if (matchResult[3][i] !== currentResult[3][i]) {
            return;
          }
        }
      }

      if (idx === 15) {
        // 경기 종료
        for (let i = 0; i < 3; i++) {
          if (
            matchResult[4][i] !== currentResult[4][i] ||
            matchResult[5][i] !== currentResult[5][i]
          ) {
            return;
          }
        }
        possible = true;
        return;
      }

      if (idx < 5) {
        // A 나라 경기
        const win = currentResult.map((c) => [...c]);
        const draw = currentResult.map((c) => [...c]);
        const fail = currentResult.map((c) => [...c]);

        win[0][0] += 1;
        win[idx + 1][2] += 1;

        draw[0][1] += 1;
        draw[idx + 1][1] += 1;

        fail[0][2] += 1;
        fail[idx + 1][0] += 1;

        match(idx + 1, win);
        match(idx + 1, draw);
        match(idx + 1, fail);
      } else if (idx < 9) {
        // B 나라 경기
        const win = currentResult.map((c) => [...c]);
        const draw = currentResult.map((c) => [...c]);
        const fail = currentResult.map((c) => [...c]);

        win[1][0] += 1;
        win[idx - 3][2] += 1;

        draw[1][1] += 1;
        draw[idx - 3][1] += 1;

        fail[1][2] += 1;
        fail[idx - 3][0] += 1;

        match(idx + 1, win);
        match(idx + 1, draw);
        match(idx + 1, fail);
      } else if (idx < 12) {
        // C 나라 경기
        const win = currentResult.map((c) => [...c]);
        const draw = currentResult.map((c) => [...c]);
        const fail = currentResult.map((c) => [...c]);

        win[2][0] += 1;
        win[idx - 6][2] += 1;

        draw[2][1] += 1;
        draw[idx - 6][1] += 1;

        fail[2][2] += 1;
        fail[idx - 6][0] += 1;

        match(idx + 1, win);
        match(idx + 1, draw);
        match(idx + 1, fail);
      } else if (idx < 14) {
        // D 나라 경기
        const win = currentResult.map((c) => [...c]);
        const draw = currentResult.map((c) => [...c]);
        const fail = currentResult.map((c) => [...c]);

        win[3][0] += 1;
        win[idx - 8][2] += 1;

        draw[3][1] += 1;
        draw[idx - 8][1] += 1;

        fail[3][2] += 1;
        fail[idx - 8][0] += 1;

        match(idx + 1, win);
        match(idx + 1, draw);
        match(idx + 1, fail);
      } else {
        // E 나라 경기
        const win = currentResult.map((c) => [...c]);
        const draw = currentResult.map((c) => [...c]);
        const fail = currentResult.map((c) => [...c]);

        win[4][0] += 1;
        win[idx - 9][2] += 1;

        draw[4][1] += 1;
        draw[idx - 9][1] += 1;

        fail[4][2] += 1;
        fail[idx - 9][0] += 1;

        match(idx + 1, win);
        match(idx + 1, draw);
        match(idx + 1, fail);
      }
    }

    match(
      0,
      new Array(6).fill(0).map(() => new Array(3).fill(0))
    );

    return possible;
  }

  for (let i = 0; i < 4; i++) {
    const line = input[i].split(' ').map((v) => +v);

    const matchResult = [];
    for (let j = 0; j < 6; j++) {
      matchResult.push(line.slice(3 * j, 3 * j + 3));
    }

    if (isPossible(matchResult)) {
      result.push(1);
    } else {
      result.push(0);
    }
  }

  return result.join(' ');
}

console.log(solution(input));
