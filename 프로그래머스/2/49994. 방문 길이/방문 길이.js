function solution(dirs) {
    const dir = dirs.split("");
    let answer = 0;
    const matrix = Array.from({length: 11}, () => Array.from({length: 11}, () => new Array(4).fill(0)));
    let row = 5;
    let col = 5;
    
    dir.forEach((v) => {
        const dr = (v === "U" ? -1 : (v === "D" ? 1 : 0));
        const dc = (v === "L" ? -1 : (v === "R" ? 1 : 0));
        const next_row = row + dr;
        const next_col = col + dc;
        
        if(0 <= next_row && next_row <= 10 && 0 <= next_col && next_col <= 10) {
            
            const idx = v === "U" ? 0 : (v === "L" ? 1 : (v === "R" ? 2 : 3));
            if (matrix[row][col][idx] === 0) {
                answer += 1;
            }
            
            matrix[row][col][idx] = 1;
            matrix[next_row][next_col][3 - idx] = 1;
            row = next_row;
            col = next_col;
        }
    });
    
    return answer;
}