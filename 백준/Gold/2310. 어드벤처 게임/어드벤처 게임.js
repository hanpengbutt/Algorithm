let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(N, rooms) {
  let result = 'No'
  const graph = new Array(N + 1).fill(0).map(() => []);

  rooms.forEach((room, idx) => {
    const connectCount = room.length - 3;
    for (let i = 0; i < connectCount; i++) {
      graph[idx + 1].push(room[2 + i]);
    }
  });

  let visited = Array(graph.length).fill(0);
  let paths = [];

  function dfs(now, path) {
    visited[now] = 1;
    path.push(now);

    if (now === N) {
      paths.push([...path]);
    }

    for (let i = 0; i < graph[now].length; i++) {
      let next = graph[now][i];
      if (!visited[next]) {
        dfs(next, path);
      }
    }

    path.pop();
    visited[now] = 0;
  }

  dfs(1, []);

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    let money = 0;
    for (let j = 0; j < path.length; j++) {
      const num = path[j];
      switch (rooms[num - 1][0]) {
        case 'E':
          break;
        case 'L':
          if (money < rooms[num - 1][1]) money = rooms[num - 1][1];
          break;
        case 'T':
          money -= rooms[num - 1][1];
      }
      if (money < 0) break;
    }

    if (money >= 0) {
      result = 'Yes'
      break
    }
  }

  return result
}

let i = 0;
while (1) {
  const N = +input[i];
  if (N === 0) break;

  const rooms = input
    .slice(i + 1, i + N + 1)
    .map((room) => room.split(' ').map((v, i) => (i === 0 ? v : +v)));

  i += N + 1;

  console.log(solution(N, rooms));
}
