function solution(signals) {
    const signals_sum = signals.map((signal) => signal.reduce((acc, cur) => acc + cur))
    const count = signals_sum.reduce((acc, cur) => acc *= cur, 1)
    
    for(let i = 0; i < count; i++) {
        let flag = 1
        
        for(let j = 0; j < signals.length; j++) {
            const time = i % signals_sum[j]
            if(signals[j][0] > time || time >= signals[j][0] + signals[j][1]) flag = 0
            
            if(!flag) break
        }
        
        if(flag) return i + 1
    }
    
    return -1
}