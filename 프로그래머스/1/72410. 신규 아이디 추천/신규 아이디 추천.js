function solution(new_id) {
    let answer = [...new_id.toLowerCase()];
    
    answer = answer.filter((v) => {
        const charCode = v.charCodeAt();
        return (97 <= charCode && charCode <= 122) || !isNaN(+v) || v === '-' || v === '_' || v === '.'
    });
    
    let flag = 0;
    answer = answer.map((v) => {
        if(v !== '.') {
            flag = 0;
            return v;
        } else if(flag === 0) {
            flag = 1;
            return v;
        } else {
            return ''
        }
    }).filter((v) => v !== '');
    
    if(answer.length) {
        if(answer[0] === '.') answer.shift();
    }
    if(answer.length) {
        if(answer[answer.length - 1] === '.') answer.pop();
    }
    
    if(!answer.length) {
        answer.push('a');
    } 
    
    if(answer.length > 15) {
        answer = answer.slice(0, 15);
        if(answer[answer.length - 1] === '.') answer.pop();
    } else if(answer.length < 3) {
        const lastChar = answer[answer.length - 1];
        while(answer.length !== 3) {
            answer.push(lastChar);
        }
    }
    
    return answer.join('');
}