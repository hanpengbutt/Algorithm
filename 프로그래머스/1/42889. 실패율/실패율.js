function solution(N, stages) {
    const stage = new Array(N + 1).fill(0);
    stages.forEach(v => stage[v - 1] += 1);

    let fails = {};
    let total = stage.reduce((acc, cur) => acc + cur);
    
    for(let i = 0; i < N; i++) {
        fails[i + 1] = stage[i] / total;
        total -= stage[i];
    }
    
    return Object.entries(fails).sort((a, b) => b[1] - a[1]).map(v => +v[0]);
        
}