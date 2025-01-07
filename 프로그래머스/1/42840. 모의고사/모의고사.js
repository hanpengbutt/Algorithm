function solution(answers) {
    const patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ]
    const result = [0, 0, 0]
    const answer = []
    
    for(let i = 0; i < answers.length; i++) {
        for(let j = 0; j < patterns.length; j++){
            if(answers[i] === patterns[j][i % patterns[j].length]) {
                result[j] += 1
            }
        }
    }
    
    const max_val = Math.max(...result)
    result.forEach((v, i) => {
        if(v === max_val) {
            answer.push(i + 1)
        }
    })
    
    return answer
}