let fs = require('fs');
let [N, ...coords] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
coords = coords.map((coord) => coord.split(' ').map(Number));

function solution(N, coords) {
  let minX = (minY = Infinity);
  let maxX = (maxY = -Infinity);

  for (let i = 0; i < N; i++) {
    const [x, y] = coords[i];
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  if (maxX - minX === maxY - minY) {
    // 두 x값의 차와 두 y값의 차가 같은 경우
    for (let i = 0; i < N; i++) {
      const [x, y] = coords[i];
      if (
        (minX > x || x > maxX || (y !== minY && y !== maxY)) &&
        (minY > y || y > maxY || (x !== minX && x !== maxX))
      ) {
        return -1
      }
    }
    return maxX - minX
  } else if (maxX - minX > maxY - minY) {
    // 두 x값의 차가 두 y값의 차보다 더 큼, y축 고정
    minY = -1000;
    maxY = minY + maxX - minX;
    while (maxY <= 1000) {
      let flag = true;
      for (let i = 0; i < N; i++) {
        const [x, y] = coords[i];
        if (
          (minX > x || x > maxX || (y !== minY && y !== maxY)) &&
          (minY > y || y > maxY || (x !== minX && x !== maxX))
        ) {
          flag = false;
          break;
        }
      }

      if (flag) {
        return maxX - minX;
      }
      minY += 1;
      maxY += 1;
    }
  } else {
    // 두 y값의 차가 두 x값의 차보다 더 큼, x축 고정
    minX = -1000;
    maxX = minX + maxY - minY;
    while (maxX <= 1000) {
      let flag = true;
      for (let i = 0; i < N; i++) {
        const [x, y] = coords[i];
        if (
          (minX > x || x > maxX || (y !== minY && y !== maxY)) &&
          (minY > y || y > maxY || (x !== minX && x !== maxX))
        ) {
          flag = false;
          break;
        }
      }

      if (flag) {
        return maxX - minX;
      }
      minX += 1;
      maxX += 1;
    }
  }

  return -1
}

console.log(solution(N, coords));
