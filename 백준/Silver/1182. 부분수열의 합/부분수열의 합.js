let fs = require('fs');
let input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, S] = input[0].split(' ').map((v) => +v);
const permutation = input[1].split(' ').map((v) => +v);

const solution = (N, S, permutation) => {
    let answer = 0;
    const result = new Array(2 ** N).fill(0);

    permutation.forEach((value, idx) => {
        const section = 2 ** (N - idx - 1);
        let isInclude = true;
        for(let i = 0; i < 2 ** N; i += section) {
            for(let j = i; j < i + section; j++) {
                if(isInclude) result[j] += value;
            }
            isInclude = !isInclude;
        }
    });

    return result.slice(0, -1).filter((value) => value === S).length;
};

console.log(solution(N, S, permutation));