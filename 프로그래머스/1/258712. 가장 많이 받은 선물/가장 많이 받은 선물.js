function solution(friends, gifts) {
    const result = new Array(friends.length).fill(0);
    const record = new Map();
    
    for(let A of friends) {
        const map = new Map();
        for(let B of friends) {
            map.set(B, 0);
        }
        map.set('score', 0);
        record.set(A, map);
    }
    
    for(let gift of gifts) {
        const [A, B] = gift.split(' ');
        record.get(A).set(B, record.get(A).get(B) + 1);
        record.get(A).set('score', record.get(A).get('score') + 1);
        record.get(B).set('score', record.get(B).get('score') - 1);
    }
    
    for(let i = 0; i < friends.length; i++) {
        for(let j = i + 1; j < friends.length; j++) {
            const A = friends[i];
            const B = friends[j];
            
            const countA = record.get(A).get(B); // A가 B에게 준 선물의 개수
            const countB = record.get(B).get(A); // B가 A에게 준 선물의 개수
            
            if((countA || countB) && (countA !== countB)) {
                if(countA > countB) {
                    result[i] += 1;
                } else {
                    result[j] += 1;
                }
            } else {
                const scoreA = record.get(A).get('score'); // A의 선물 지수
                const scoreB = record.get(B).get('score'); // B의 선물 지수
                
                if(scoreA > scoreB) {
                    result[i] += 1;
                } else if(scoreA < scoreB) {
                    result[j] += 1;
                }
            }
            
        }  
    }

    return Math.max(...result)
}