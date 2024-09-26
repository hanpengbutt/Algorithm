let fs = require('fs');
let input = fs.readFileSync(0, 'utf-8').trim().split('\n').slice(1);

const solution = (input) => {
    const result = [];

    const getPermutation = (arr, r) => {
        const answer = [];
        if(r === 1) return arr.map((e) => [e]);
        
        arr.forEach((fixed, idx, origin) => {
            answer.push(...getPermutation(arr, r - 1).map((p) => [fixed, ...p]))
        });
        
        return answer;
    }
    
    input.forEach((n) => {
        let answer = 1;
        if(n === 2 || n === 3) answer++;
        
        const arr = [1, 2, 3];
        for(let i = 2; i < n; i++) {
            answer += getPermutation(arr, i).filter((p) => p.reduce((acc, cur) => acc += cur, 0) === n).length
        }
        result.push(answer);
    });
    
    return result.join('\n').trimEnd();
};

console.log(solution(input.map((v) => +v)));