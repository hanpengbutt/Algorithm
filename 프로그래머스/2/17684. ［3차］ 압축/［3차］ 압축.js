function solution(msg) {
    let result = []
    // 1. 길이가 1인 모든 단어를 포함하도록 사전 초기화
    const dict = new Map(new Array(26).fill(0).map((_, i) => [String.fromCharCode(i + 65), i + 1]))
    msg = msg.split('')
    let idx = 0

    while(idx < msg.length) {
        // 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾음
        let lastIdx = idx + 1
        let w
        while(lastIdx <= msg.length) {
            let newW = msg.slice(idx, lastIdx).join('')
            if(dict.get(newW)) {
                w = newW
                lastIdx++
            } else {
                break
            }
        }
    
        // 3. w에 해당하는 사전의 색인번호 출력
        result.push(dict.get(w))
        
        // 4. 입력에서 처리되지 않은 다음 글자(c)가 있다면, w+c에 해당하는 단어 사전 등록
        if(lastIdx !== msg.length) {
            dict.set(msg.slice(idx, lastIdx).join(''), dict.size + 1)
        }
        
        idx = lastIdx - 1
    }
    
    return result
}