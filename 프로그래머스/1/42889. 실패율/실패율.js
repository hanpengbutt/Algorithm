function solution(N, stages) {
    const stage = new Array(N + 1).fill(0);
    stages.forEach(v => stage[v - 1] += 1);
    stage.reverse();
    let answer = [];
    
    let cur_sum = stage[0];
    for(let i = 1; i < N + 1; i++) {
        if(stage[i] !== 0) {
            answer.push(stage[i] / (cur_sum + stage[i]));
        } else {
            answer.push(0);
        }
        cur_sum += stage[i]
    }
    
    answer.reverse();
    answer = answer.map((value, idx) => ({value, idx}));
    answer.sort((a, b) => b.value - a.value);
    answer = answer.map(e => (e.idx + 1));
    
    return answer;
}