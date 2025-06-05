function solution(orders, course) {
    orders = orders.map((order) => order.split('').sort());
    
    const map = new Map();
    let nowOrder;
    
    function select(idx, selected) {
        if(idx >= 2) {
            const key = selected.map((v) => nowOrder[v]).join('');
            map.set(key, (map.get(key) || 0) + 1);
        }
        
        if(idx === Math.min(course[course.length - 1], nowOrder.length)) return;
        
        for(let i = selected[idx - 1] + 1; i < nowOrder.length; i++) {
            select(idx + 1, [...selected, i])
        }
    }
    
    orders.forEach((order) => {
        nowOrder = order;
        for(let i = 0; i < order.length; i++) {
            select(1, [i]);
        }
    });
    
    const result = new Map();
    course.forEach((c) => result.set(c, {count: 0, course: []}));
    
    map.forEach((v, k) => {
        const c = result.get(k.length)
        if(v > 1 && c) {
            if(c.count < v) {
                result.set(k.length, {count: v, course: [k]});
            } else if(c.count === v) {
                c.course.push(k);
            }
        }
    });
    
    return [...result.values()].map((v) => v.course).flat().sort();
}