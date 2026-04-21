function solution(cost, hint) {
    const n = cost.length
    let min = Infinity
    
    function getCount(mask) {
        const map = new Map()
        let count = cost[0][0]
        
        for(let i = 0; i < n; i++) {
            if(i !== 0) {
                const c = map.get(i + 1) ? ((map.get(i + 1) > n - 1) ? n - 1 : map.get(i + 1)) : 0
                count += cost[i][c]
                map.delete(i)
            }
                
            if(i !== n - 1 && (mask & (1 << i))) {
                hint[i].forEach((v, i) => {
                    if(i !== 0) map.set(v, (map.get(v) || 0) + 1)
                })
            }
        }
        return count
    }
    
    function generate(idx, currentMask, cost) {
        if(idx === n) {
            const count = getCount(currentMask)
            if(cost + count < min) min = cost + count
            return
        }
        
        if(idx === n - 1) {
            generate(idx + 1, currentMask, cost)   
        } else {
            if(hint[idx][0]) {
                generate(idx + 1, currentMask, cost)   
            }
            generate(idx + 1, currentMask | (1 << idx), cost + hint[idx][0])
        }
    }
    
    generate(0, 0, 0)
    
    return min
}