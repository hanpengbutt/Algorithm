function solution(number, k) {
    number = number.split('').map((v) => +v)
    const selected = [0]
    const deleted = new Set()
    
    for(let i = 1; i < number.length; i++) {
        while(selected.length) {
            const a = number[selected[selected.length - 1]]
            const b = number[i]
            if(a < b) {
                deleted.add(selected[selected.length - 1])
                selected.pop()
                if(deleted.size === k) break
            } else {
                break
            }
        }
        
        selected.push(i)
        if(deleted.size === k) break
    }
    
    number = number.filter((num, idx) => !deleted.has(idx)).slice(0, number.length - k).join('')
    
    
    return number
}