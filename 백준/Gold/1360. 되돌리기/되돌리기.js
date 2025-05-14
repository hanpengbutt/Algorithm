let fs = require('fs');
let [N, ...commands] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
commands = commands.map((command) => command.split(' '));

function solution(N, commands) {
  let idx = N - 1;
  let time = BigInt(commands[idx][2]);
  let result = [];

  while (time > 0n) {
    if (commands[idx][0] === 'type') {
      result.push(commands[idx][1]);
      time -= 1n;
    } else {
      time -= BigInt(commands[idx][1]) + 1n;
    }

    if (idx === 0) break;

    let newTime = time;

    for (let i = 0; i < N; i++) {
      if (BigInt(commands[i][2]) > time) break;
      idx = i;
      newTime = BigInt(commands[i][2]);
    }

    time = newTime;
  }

  return result.length ? result.reverse().join('') : '';
}

console.log(solution(N, commands));
