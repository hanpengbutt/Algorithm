function solution(n, words) {
    let num = turn = 0;
    const map = new Map([[words[0], 1]]);
    let end = words[0][words[0].length - 1]; 
    
    for(let i = 1; i < words.length; i++) {
        num = (i + 1) % n;
        num = num === 0 ? n : num;
        turn = Math.ceil((i + 1) / n);
        
        const first = words[i][0];
        
        if(first !== end || map.get(words[i])) {
            return [num, turn];
        }
        map.set(words[i], true);
        end = words[i][words[i].length - 1];
    }
    
    return [0, 0];
}