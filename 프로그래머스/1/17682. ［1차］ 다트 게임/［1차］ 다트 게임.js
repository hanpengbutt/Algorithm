function solution(dartResult) {
    const regExp = /(\d{1,2})([SDT])([*#]?)/g;
    const bonusCount = new Map([['S', 1], ['D', 2], ['T', 3]])
    
    dartResult = [...dartResult.matchAll(regExp)]
    
    const result = new Array(3).fill(0);
    
    for(let i = 0; i < 3; i++) {
        let [score, bonus, option] = [dartResult[i][1], dartResult[i][2], dartResult[i][3]];
        score = (+score) ** bonusCount.get(bonus);
        result[i] = score;
        
        if(option === '*') {
            result[i] *= 2;
            if(i) result[i - 1] *= 2;
        } else if(option === '#') {
            result[i] *= -1;
        }
        
    }
    
    return result.reduce((acc, cur) => acc += cur);
}