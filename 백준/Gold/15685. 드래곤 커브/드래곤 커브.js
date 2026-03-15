const fs = require('fs');
let [N, ...curves] = fs.readFileSync(0, 'utf8').trim().split('\n');
N = +N;
curves = curves.map((curve) => curve.split(' ').map((v) => +v));

function solution(N, curves) {
  let result = 0;
  const matrix = new Array(101).fill(0).map(() => new Array(101).fill(0));
  const vector = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];

  function getCurve(endX, endY, d, remainG, points) {
    if (remainG < 0) {
      points.forEach((point) => {
        matrix[point[0]][point[1]] = 1;
      });
      return;
    }

    if (points.length) {
      let newPoints = [points[0]];
      for (let i = 1; i < points.length; i++) {
        const curDx = points[i][0] - points[i - 1][0];
        const curDy = points[i][1] - points[i - 1][1];
        const curD = vector.findIndex((v) => v[0] === curDx && v[1] === curDy);
        const nextD = (curD + 3) % 4;
        const [nextDx, nextDy] = vector[nextD];
        const [x, y] = newPoints[newPoints.length - 1];
        newPoints.push([x + nextDx, y + nextDy]);
      }
      const [startX, startY] = newPoints.pop();
      const [dx, dy] = [endX - startX, endY - startY];
      newPoints = newPoints
        .map((point) => [point[0] + dx, point[1] + dy])
        .reverse();
      getCurve(
        newPoints[newPoints.length - 1][0],
        newPoints[newPoints.length - 1][1],
        d,
        remainG - 1,
        [...points, ...newPoints],
      );
    } else {
      const [dx, dy] = vector[d];
      getCurve(endX + dx, endY + dy, d, remainG - 1, [
        ...points,
        [endX, endY],
        [endX + dx, endY + dy],
      ]);
    }
  }

  curves.forEach((curve) => {
    const [x, y, d, g] = curve;
    getCurve(x, y, d, g, []);
  });

  for (let row = 0; row < 100; row++) {
    for (let col = 0; col < 100; col++) {
      if (
        matrix[row][col] &&
        matrix[row][col + 1] &&
        matrix[row + 1][col] &&
        matrix[row + 1][col + 1]
      )
        result++;
    }
  }

  return result;
}

console.log(solution(N, curves));
