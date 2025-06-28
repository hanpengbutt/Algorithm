let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n').map((v, i) => [+v, i + 1]);

function solution(input) {
    input = input.sort((a, b) => b[0] - a[0]).slice(0, 5);

    console.log(input.reduce((acc, cur) => acc += cur[0], 0));
    console.log(input.map((v) => v[1]).sort((a, b) => a - b).join(' '));
}

solution(input);