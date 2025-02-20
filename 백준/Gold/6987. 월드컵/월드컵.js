let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(input) {
  let result = [];

  function isPossible(matchResult) {
    let currentResult = new Array(6).fill(0).map(() => new Array(3).fill(0));
    let possible = false;

    function increase(result, own, opp) {
      if (result === 'win') {
        currentResult[own][0] += 1;
        currentResult[opp][2] += 1;
      } else if (result === 'draw') {
        currentResult[own][1] += 1;
        currentResult[opp][1] += 1;
      } else {
        currentResult[own][2] += 1;
        currentResult[opp][0] += 1;
      }
    }

    function decrease(result, own, opp) {
      if (result === 'win') {
        currentResult[own][0] -= 1;
        currentResult[opp][2] -= 1;
      } else if (result === 'draw') {
        currentResult[own][1] -= 1;
        currentResult[opp][1] -= 1;
      } else {
        currentResult[own][2] -= 1;
        currentResult[opp][0] -= 1;
      }
    }

    function match(idx) {
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
        increase('win', 0, idx + 1);
        match(idx + 1);
        decrease('win', 0, idx + 1);

        increase('draw', 0, idx + 1);
        match(idx + 1);
        decrease('draw', 0, idx + 1);

        increase('fail', 0, idx + 1);
        match(idx + 1);
        decrease('fail', 0, idx + 1);
      } else if (idx < 9) {
        // B 나라 경기
        increase('win', 1, idx - 3);
        match(idx + 1);
        decrease('win', 1, idx - 3);

        increase('draw', 1, idx - 3);
        match(idx + 1);
        decrease('draw', 1, idx - 3);

        increase('fail', 1, idx - 3);
        match(idx + 1);
        decrease('fail', 1, idx - 3);
      } else if (idx < 12) {
        // C 나라 경기
        increase('win', 2, idx - 6);
        match(idx + 1);
        decrease('win', 2, idx - 6);

        increase('draw', 2, idx - 6);
        match(idx + 1);
        decrease('draw', 2, idx - 6);

        increase('fail', 2, idx - 6);
        match(idx + 1);
        decrease('fail', 2, idx - 6);
      } else if (idx < 14) {
        // D 나라 경기
        increase('win', 3, idx - 8);
        match(idx + 1);
        decrease('win', 3, idx - 8);

        increase('draw', 3, idx - 8);
        match(idx + 1);
        decrease('draw', 3, idx - 8);

        increase('fail', 3, idx - 8);
        match(idx + 1);
        decrease('fail', 3, idx - 8);
      } else {
        // E 나라 경기
        increase('win', 4, idx - 9);
        match(idx + 1);
        decrease('win', 4, idx - 9);

        increase('draw', 4, idx - 9);
        match(idx + 1);
        decrease('draw', 4, idx - 9);

        increase('fail', 4, idx - 9);
        match(idx + 1);
        decrease('fail', 4, idx - 9);
      }
    }

    match(0);

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
