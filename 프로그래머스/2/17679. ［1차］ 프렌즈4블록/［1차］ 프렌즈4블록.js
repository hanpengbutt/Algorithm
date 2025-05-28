function solution(m, n, board) {
    let result = 0;
    board = board.map((row) => row.split(''));
    const vector = [[0, 0], [0, 1], [1, 0], [1, 1]];
    
    function bomb() {
        let bombCount = 0;
        let newBoard = board.map((row) => [...row]);
            
        for(let row = 0; row < m - 1; row += 1) {
            for(let col = 0; col < n - 1; col += 1) {
                const set = new Set();
                vector.forEach(([dr, dc]) => {
                    set.add(board[row + dr][col + dc]);
                });
                if(set.size === 1) {
                    vector.forEach(([dr, dc]) => {
                        if(newBoard[row + dr][col + dc]) {
                            newBoard[row + dr][col + dc] = 0;
                            bombCount++;
                        }   
                    });
                }
            }
        }
        
        board = newBoard;
        return bombCount;
    }
    
    function drop() {
        for(let col = 0; col < n; col++) {
            const newCol = [];
            for(let row = m - 1; row > -1; row--) {
                if(board[row][col]) newCol.push(board[row][col])
            }
            for(let row = m - 1; row > -1; row--) {
                board[row][col] = (m - 1 - row) < newCol.length ? newCol[m - 1 - row] : 0;
            }
        }
    }
    
    while(1) {
        const bombCount = bomb();
        if(bombCount === 0) break;
        result += bombCount;
        drop();
    }
    
    return result;
}