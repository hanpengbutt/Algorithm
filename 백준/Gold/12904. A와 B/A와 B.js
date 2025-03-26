let fs = require('fs')
let [S, T] = fs.readFileSync(0, 'utf8').trim().split('\n')

function solution(S, T) {
    T = [...T]
    while(T.length !== S.length) {
        const popItem = T.pop()
        if( popItem === 'B') {
            T.reverse()
        } 
    }
    
    return T.join('') === S ? 1 : 0
}

console.log(solution(S,T))