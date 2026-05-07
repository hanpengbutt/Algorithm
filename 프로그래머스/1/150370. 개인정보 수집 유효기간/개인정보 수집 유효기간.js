function solution(today, terms, privacies) {
    function dateToNumber(date) {
        return date.split('.').map((v, i) => {
            if(i === 0) return 12 * 28 * +v
            if(i === 1) return 28 * +v
            return +v
        }).reduce((acc, cur) => acc += cur)
    }
    
    today = dateToNumber(today)
    const result = []
    const termsMap = new Map()
    terms.forEach((term) => {
        const [type, month] = term.split(' ')
        termsMap.set(type, +month)
    })
    
    privacies.forEach((privacy, idx) => {
        const [date, type] = privacy.split(' ')
        if(dateToNumber(date) + termsMap.get(type) * 28 <= today) {
            result.push(idx + 1)
        }
    })
    
    return result
}