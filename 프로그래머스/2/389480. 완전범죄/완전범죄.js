function solution(info, n, m) {
    let aCount = 0, bCount = 0
    info.sort((a, b) => {
      const r1 = b[0] / b[1] - a[0] / a[1];
      if (r1 !== 0) return r1;

      const r2 = b[0] - a[0];
      if (r2 !== 0) return r2;

      return a[1] - b[1];
    });
    
    for(const [aCost, bCost] of info) {
        if(bCount + bCost < m) {
            bCount += bCost
        } else if(aCount + aCost < n) {
            aCount += aCost
        } else {
            return -1
        }
    }
    
    return aCount
}