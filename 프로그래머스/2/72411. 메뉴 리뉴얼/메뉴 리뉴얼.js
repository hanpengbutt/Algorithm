function solution(orders, course) {
    orders = orders.map((order) => new Set(order.split(''))).sort((a, b) => b.size - a.size);
    course = new Set(course);
    
    const options = [];
    for(let i = 0; i < orders.length - 1; i++) {
        for(let j = i + 1; j < orders.length; j++) {
            console.log(orders[i], orders[j])
            const option = new Set([...orders[i]].filter((order) => orders[j].has(order)));
            if(option.size > 1 && course.has(option.size)) {
                options.push(option);
            }
        }
    }
    
    console.log(options)
    
}