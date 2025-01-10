function solution(s)
{
    const str = s.split("");
    const stack = [];
    
    for(let i = 0; i < str.length; i++) {
        if(stack.length !== 0 && stack[stack.length - 1] === str[i]){
            stack.pop();
        } else {
            stack.push(str[i]);
        }
    }
    
    return stack.length === 0 ? 1 : 0;
}