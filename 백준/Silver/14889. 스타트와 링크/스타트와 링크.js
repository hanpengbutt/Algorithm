let fs = require('fs');
let [N, ...S] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
S = S.map((s) => s.split(' ').map((v) => +v));

function solution(N, S) {
  let result = +Infinity;
  function add(idx, team) {
    if (result === 0) return;

    if (team.length === N / 2) {
      const enemyTeam = new Array(N)
        .fill(0)
        .map((_, i) => i)
        .filter((v) => !team.includes(v));

      let scoreTeam = 0;
      let scoreEnemyTeam = 0;

      for (let i = 0; i < N / 2; i++) {
        for (let j = i + 1; j < N / 2; j++) {
          scoreTeam += S[team[i]][team[j]];
          scoreTeam += S[team[j]][team[i]];
          scoreEnemyTeam += S[enemyTeam[i]][enemyTeam[j]];
          scoreEnemyTeam += S[enemyTeam[j]][enemyTeam[i]];
        }
      }

      const score =
        scoreTeam > scoreEnemyTeam
          ? scoreTeam - scoreEnemyTeam
          : scoreEnemyTeam - scoreTeam;

      if (result > score) result = score;
      return;
    }

    if (team.length + N - idx < N / 2) {
      return;
    }

    add(idx + 1, team);
    const newTeam = [...team];
    newTeam.push(idx);
    add(idx + 1, newTeam);
  }

  add(0, []);

  return result;
}

console.log(solution(N, S));
