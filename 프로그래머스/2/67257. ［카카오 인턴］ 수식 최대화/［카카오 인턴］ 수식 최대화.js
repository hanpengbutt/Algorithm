function solution(expression) {
    let maxResult = 0;
    const regExp = /\d+|[+\-*]/g;
    let origin = expression.match(regExp);
    const op = ['+', '-', '*'];
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            for(let k = 0; k < 3; k++) {
                if(i !== j && j !== k && k !== i) {
                    let expression = origin;
                    expression = addPair(expression, op[i]);
                    expression = addPair(expression, op[j]);
                    expression = addPair(expression, op[k]);
                    let result = Math.abs(expression[0])
                    if(result > maxResult) maxResult = result;
                }
            }
        }
    }
    
    function addPair(expression, op) {
        const stack = [];
        let flag = 1
        for(let i = 0; i < expression.length; i++) {
            if(flag) {
                const e = expression[i];
                if(e !== op) {
                    stack.push(e);
                } else {
                    const n1 = +stack.pop();
                    const n2 = +expression[i + 1];
                    switch(op) {
                        case '+':
                            stack.push(n1 + n2);
                            break;
                        case '-':
                            stack.push(n1 - n2);
                            break;
                        case '*':
                            stack.push(n1 * n2);
                            break;
                    }
                    flag = 0;
                }
            } else {
                flag = 1;
            }
        }
        
        return stack;
    }
    
    return maxResult;
}