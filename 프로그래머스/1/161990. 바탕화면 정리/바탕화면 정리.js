function solution(wallpaper) {
    const row_count = wallpaper.length
    const col_count = wallpaper[0].length

    let first = [Infinity, Infinity]
    let last = [-Infinity, -Infinity]
    
    for(let i = 0; i < row_count; i++) {
        for(let j = 0; j < col_count; j++) {
            if(wallpaper[i][j] === '#') {
                if(i < first[0]) first[0] = i
                if(j < first[1]) first[1] = j
                if(i + 1 > last[0]) last[0] = i + 1
                if(j + 1 > last[1]) last[1] = j + 1 
            }
        }
    }
    
    return first.concat(last)
}