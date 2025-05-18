const num = new Array(10 ** 4 + 1).fill(1);

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    num[10 * i + j + i + j] = 0;
    for (let k = 0; k < 10; k++) {
      num[100 * i + 10 * j + k + i + j + k] = 0;
      for (let l = 0; l < 10; l++) {
        num[1000 * i + 100 * j + 10 * k + l + i + j + k + l] = 0;
      }
    }
  }
}

for (let i = 1; i < num.length; i++) {
  if (num[i] === 1) console.log(i);
}
