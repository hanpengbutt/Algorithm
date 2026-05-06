function solution(message, spoiler_ranges) {
    let idx = 0
    let [start, end] = spoiler_ranges[idx]
    
    const words = new Set()
    const spoiler_words = []
    
    let word = []
    let is_spoiler = 0
    
    for(let i = 0; i < message.length; i++) {
        if(i < start) {
            if(message[i] !== ' ') {
                word.push(message[i])
            } else {
                if(is_spoiler) {
                    spoiler_words.push(word.join(''))
                } else {
                    words.add(word.join(''))   
                }
                
                is_spoiler = 0
                
                word = []
            }
        } else {        
            for(let j = start; j <= end; j++) {                
                if(message[j] !== ' ') {
                    word.push(message[j])
                    is_spoiler = 1
                } else {
                    if(is_spoiler) {
                        spoiler_words.push(word.join(''))
                    } else {
                        words.add(word.join(''))   
                    }
                    
                    word = []
                    is_spoiler = 0
                }
            }

            i = end
            idx += 1
            if(idx < spoiler_ranges.length) {
                [start, end] = spoiler_ranges[idx]
            } else {
                [start, end] = [Infinity, Infinity]
            }
        }
    }
    
    if(word.length) {
        if(is_spoiler) {
            spoiler_words.push(word.join(''))
        } else {
            words.add(word.join(''))   
        }
    }
    
    const selected_spoiler_words = new Set()
    spoiler_words.forEach((word) => {
        if(!words.has(word) && !selected_spoiler_words.has(word)) {
            selected_spoiler_words.add(word)
        }
    })
    
    return selected_spoiler_words.size
}