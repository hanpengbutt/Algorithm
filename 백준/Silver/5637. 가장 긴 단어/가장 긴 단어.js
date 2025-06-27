let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim();

function solution(input) {
    const regExp = /[a-zA-Z-]+/g;

    let result = '';

    const words = input.match(regExp);
    words.pop();

    for(let word of words) {
        if(word.length > result.length) {
            result = word;
        }
    }

    return result.toLowerCase();
}

console.log(solution(input));