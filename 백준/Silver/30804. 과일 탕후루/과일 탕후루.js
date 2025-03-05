let fs = require('fs');
let [N, S] = fs.readFileSync(0, 'utf8').trim().split('\n');

N = +N;
S = S.split(' ').map((v) => +v);

function solution(N, S) {
  let result = 0;

  const fruits = [];
  let fruit = S[0];
  let count = 0;
  for (let i = 0; i < N; i++) {
    if (S[i] === fruit) {
      count += 1;
    } else {
      fruits.push([fruit, count]);
      fruit = S[i];
      count = 1;
    }

    if (i === N - 1) fruits.push([fruit, count]);
  }

  let idx = 0;
  let slected = [fruits[idx][0]];
  count = fruits[idx][1];
  while (idx < fruits.length - 1) {
    idx += 1;
    if (slected.includes(fruits[idx][0])) {
      count += fruits[idx][1];
    } else if (slected.length < 2) {
      slected.push(fruits[idx][0]);
      count += fruits[idx][1];
    } else {
      if (count > result) result = count;
      idx -= 1;
      slected = [fruits[idx][0]];
      count = fruits[idx][1];
    }
  }

  if (count > result) result = count;

  return result;
}

console.log(solution(N, S));
