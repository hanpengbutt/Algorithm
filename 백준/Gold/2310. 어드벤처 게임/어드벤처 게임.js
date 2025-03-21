let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');


function solution(N, rooms) {
  const graph = new Array(N + 1).fill(0).map(() => []);

  rooms.forEach((room, i) => {
    for (let j = 2; j < room.length - 1; j++) {
      graph[i + 1].push(room[j]);
    }
  });

  const paths = [];
  const visited = new Array(N + 1).fill(0);

  function dfs(node, path) {
    visited[node] = 1;
    path.push(node);

    if (node === N) paths.push([...path]);

    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];
      if (!visited[next]) dfs(next, path);
    }

    path.pop();
    visited[node] = 0;
  }

  dfs(1, []);

  function getMoney(money, room) {
    switch (rooms[room][0]) {
      case 'E':
        break;
      case 'L':
        money = money < rooms[room][1] ? rooms[room][1] : money;
        break;
      case 'T':
        money -= rooms[room][1];
        break;
    }

    return money;
  }

  for (let i = 0; i < paths.length; i++) {
    let money = 0;
    const path = paths[i];
    for (let j = 0; j < path.length; j++) {
      const room = path[j];
      money = getMoney(money, room - 1);
      if (money < 0) break;
    }

    if(money >=0) {
        return 'Yes'
    }
  }

  return 'No'
}

let i = 0;
while (1) {
  const N = +input[i];
  if (N === 0) break;

  const rooms = input
    .slice(i + 1, i + N + 1)
    .map((room) => room.split(' ').map((v, idx) => (idx === 0 ? v : +v)));

  console.log(solution(N, rooms));

  i = i + N + 1;
}
