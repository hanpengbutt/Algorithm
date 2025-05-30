function solution(queue1, queue2) {
    const N = queue1.length;
    const sum1 = new Map([[0n, 0]]);
    const sum2 = new Map([[0n, 0]]);
    let origin1;
    let origin2;
    let target;
    
    let sum = 0n;
    queue1.forEach((v, i) => {
        sum += BigInt(v);
        sum1.set(sum, i + 1);
    });
    origin1 = sum;
    
    sum = 0n;
    queue2.forEach((v, i) => {
        sum += BigInt(v);
        sum2.set(sum, i + 1);
    });
    origin2 = sum;
    
    const sum1Arr = [...sum1];
    const sum2Arr = [...sum2];
    for(let i = 1; i < N; i++) {
        sum1.set(origin1 + sum2Arr[i][0], N + i);
        sum2.set(origin2 + sum1Arr[i][0], N + i);
    }
    
    target = (origin1 + origin2);
    if(target % 2n !== 0n) return -1;
    target /= 2n
    
    let result = -1n;
    
    for(let [addValue, changeCount1] of sum2) {
        const subValue = origin1 + addValue - target;
        const changeCount2 = sum1.get(subValue);
        if(changeCount2 !== undefined && changeCount1 + N >= changeCount2) {
            if(result === -1n || result > changeCount1 + changeCount2) {
                result = changeCount1 + changeCount2;
            }
        }
    }
    
    return result;
}