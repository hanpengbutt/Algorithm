function solution(participant, completion) {
    const map = new Map();
    
    participant.forEach((v) => {
        if(map.get(v) === undefined) {
            map.set(v, 1);
        } else {
            map.set(v, map.get(v) + 1);
        }
    });
    
    completion.forEach((v) => {
        if(map.get(v) === 1) {
            map.delete(v);
        } else {
            map.set(v, map.get(v) - 1);
        }
    });
    
    return [...map.keys()][0];
    
}