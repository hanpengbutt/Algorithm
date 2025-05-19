function solution(s) {
    let result = []
    let map = new Map()
    const nums = new Array(501).fill(0)
    let set = []
    
    s.split('').forEach((v) => {
        if(v === '{') {
            set = []
        } else if(v === '}') {
            const element = set.join('').split(',')
            nums[element.length] = [...element]
        } else  {
            set.push(v)
        }
    })
    
    for(let i = 1; i < nums.length; i++) {
        if(!nums[i]) break
        for(let j = 0; j < nums[i].length; j++) {
            if(!map.get(nums[i][j])) {
                map.set(nums[i][j], 1)
                result.push(nums[i][j])
                break
            }
        }
    }
    
    return result.map(Number)
}