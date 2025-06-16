function solution(relation) {
    const row = relation.length; // 행(튜플)의 개수
    const col = relation[0].length; // 열(속성)의 개수
    let keys = new Array(col).fill(0).map(() => []); // 키들의 조합
    const candKeys = []; // 후보키
    
    function select(idx, selected, lastSelected) {
        keys[idx - 1].push(selected);
        
        if(idx === col) {
            return;
        }
        
        for(let i = lastSelected + 1; i < col; i++) {
            select(idx + 1, [...selected].map((v, idx) => idx === i ? 1 : v), i)
        }
    }
    
    for(let i = 0; i < col; i++) {
        select(1, new Array(col).fill(0).map((_, idx) => idx === i ? 1 : 0), i);
    }

    keys = keys.flat();
    
    function isCandKey(key) {
        for(let candKey of candKeys) {
            let count = 0;
            for(let i = 0; i < col; i++) {
                if(candKey[i] && key[i]) count++;
            }
            if(count === candKey.filter((v) => v === 1).length) return false;
        }
        
        const set = new Set();
        
        for(let r of relation) {
            const value = r.filter((_, i) => key[i]).join(' ');
            if(set.has(value)) {
                return false;
            }
            set.add(value);
        }
        
        return true;
    }
    
    for(let key of keys) {
        if(isCandKey(key)) {
            candKeys.push(key);
        }
    }
    
    return candKeys.length;
}