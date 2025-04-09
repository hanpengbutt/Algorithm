let fs = require('fs');
let [N, pattern, ...input] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

const [prefix, suffix] = pattern.split('*');

function solution(prefix, suffix, file) {
  if (prefix.length + suffix.length > file.length) {
    console.log('NE');
    return;
  }

  let start = file.slice(0, prefix.length);
  let end = file.slice(file.length - suffix.length, file.length);

  if (start === prefix && end === suffix) {
    console.log('DA');
  } else {
    console.log('NE');
  }
}

for (let i = 0; i < N; i++) {
  solution(prefix, suffix, input[i]);
}
