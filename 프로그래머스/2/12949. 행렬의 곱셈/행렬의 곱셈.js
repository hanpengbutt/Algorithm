function solution(arr1, arr2) {
    const answer = []
    for(let i = 0; i < arr1.length; i++) {
        const e = []
        for(let j = 0; j < arr2[0].length; j++) {
            let v = 0
            for(let k = 0; k < arr1[0].length; k++) {
                v += arr1[i][k] * arr2[k][j]
            }
            e.push(v)
        }
        answer.push(e)
    }
    
    return answer
}