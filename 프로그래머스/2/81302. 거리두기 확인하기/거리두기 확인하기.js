function solution(places) {
    const result = [];
    
    function getResult(place) {
        const persons = [];
        
        place.forEach((row, rowIdx) => {
            row.forEach((v, colIdx) => {
                if(v === 'P') {
                    persons.push([rowIdx, colIdx]);
                }
            })
        });
        
        for(let i = 0; i < persons.length - 1; i++) {
            for(let j = i + 1; j < persons.length; j++) {
                const [row1, col1] = persons[i];
                const [row2, col2] = persons[j];
                
                const d = Math.abs(row1 - row2) + Math.abs(col1 - col2);
                if(d === 1) {
                    return 0;
                } else if(d === 2) {
                    if(row1 === row2) {
                        let minCol = col1;
                        if(col2 < col1) {
                            minCol = col2;
                        }
                        
                        if(place[row1][minCol + 1] !== 'X' && place[row1][minCol + 2] !== 'X') {
                            return 0;
                        }
                    } else if(col1 === col2) {
                        let minRow = row1;
                        if(row2 < row1) {
                            minRow = row2;
                        }
                        if(place[minRow + 1][col1] !== 'X' && place[minRow + 2][col1] !== 'X') {
                            return 0;
                        }
                    } else {
                        if(place[row1][col2] !== 'X' || place[row2][col1] !== 'X') {
                            return 0;
                        }
                    }
                }
            }
        }
            
        return 1;
    }
    
    places.forEach((place) => {
        place = place.map((row) => row.split(''));
        result.push(getResult(place));
    });
    
    return result;
}