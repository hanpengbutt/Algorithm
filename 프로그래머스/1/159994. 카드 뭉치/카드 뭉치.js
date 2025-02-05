function solution(cards1, cards2, goal) {
    let front1 = front2 = 0;
    while(goal.length !== 0) {
        const word = goal[0];
        if(cards1[front1] === word) {
            front1 += 1;
            goal.shift()
        } else if(cards2[front2] === word) {
            front2 += 1;
            goal.shift()
        } else {
            return 'No';
        }
    }
    return 'Yes'
}