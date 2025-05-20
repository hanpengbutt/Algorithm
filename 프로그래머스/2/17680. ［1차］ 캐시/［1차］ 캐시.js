function solution(cacheSize, cities) {
    cities = cities.map((city) => city.toLowerCase())
    let result = 0
    const cache = new Map()
    const q = []
    
    if(cacheSize === 0) return 5 * cities.length
    
    for(let i = 0; i < cities.length; i++) {
        const city = cities[i]
        if(cache.get(city)) {
            result += 1
        } else {
            if(cache.size === cacheSize) {
              cache.delete(q.shift())  
            }
            cache.set(city, 1)
            result += 5
        }
        for(let j = 0; j < q.length; j++) {
            if(q[j] === city) {
                q.splice(j, 1)
            }
        }
        q.push(city)
    }
    
    return result
}