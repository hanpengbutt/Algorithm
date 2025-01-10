function solution(board, moves) {
    let result = 0;
    const n = board[0].length;
    const games = Array.from({length: n}, () => []);
    for(let i = 0; i < n; i++) {
        for(let j = n - 1; j > -1; j--) {
            if(board[j][i] !== 0) {
                games[i].push(board[j][i]);
            }
        }
    }
    const bascket = [];
    
    for(let i = 0; i < moves.length; i++) {
        const move = moves[i] - 1;
        if(games[move].length !== 0) {
            const popItem = games[move].pop();
            if(bascket.length !== 0 && bascket[bascket.length - 1] === popItem) {
                bascket.pop();
                result += 2;
            } else {
                bascket.push(popItem);
            }
        }
    }
    
    return result;
}