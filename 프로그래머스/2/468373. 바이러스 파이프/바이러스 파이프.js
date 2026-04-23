function solution(n, infection, edges, k) {
    const graph = new Array(n + 1).fill(0).map(() => [])
    const start = new Set()
    let result = -Infinity
    
    edges.forEach(([x, y, type]) => {
        graph[x].push([y, type])
        graph[y].push([x, type])
        
        if(x === infection || y === infection) start.add(type)
    })
    
    function bfs(count, type, queue, visited) {
        if(count === k) {
            if(result < queue.length) result = queue.length
            return
        }
        
        let idx = 0
        
        while(idx < queue.length) {
            const now = queue[idx++]
            graph[now].forEach(([n, t]) => {
                if(type === t && !visited[n]) {
                    queue.push(n)
                    visited[n] = 1
                }
            })
        }
        
        bfs(count + 1, (type + 1) > 3 ? (type + 1) % 3 : type + 1, [...queue], [...visited])
        bfs(count + 1, (type + 2) > 3 ? (type + 2) % 3 : type + 2, [...queue], [...visited])
    }
    
    for(const type of start) {
        const visited = new Array(n + 1).fill(0)
        visited[infection] = 1
        bfs(0, type, [infection], visited)
    }
    
    return result
}