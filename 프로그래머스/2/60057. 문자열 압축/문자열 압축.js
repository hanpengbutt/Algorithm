function solution(s) {
    let result = s.length;
    let unit = 1;
    
    while(unit <= ~~(s.length / 2)) {
        let str = [];
        let idx = 0;
        let word;
        
        while(idx + unit - 1 < s.length - unit) {
            word = s.slice(idx, idx + unit);
            let count = 1;
            let flag = 1;
            while(flag) {
                for(let i = 0; i < unit; i++) {
                    if(idx + unit * count + i >= s.length || word[i] !== s[idx + unit * count + i]) {
                        flag = 0;
                        break;
                    }
                }
                if(flag) count++;
            }
            if(count === 1) {
                str.push(word);
            } else {
                str.push(`${count}${word}`);
            }
            idx += count * unit;
        }
        
        if(idx < s.length) str.push(s.slice(idx));
        str = str.join('');
        if(str.length < result) result = str.length;
        unit++;
    }
    
    return result;
}