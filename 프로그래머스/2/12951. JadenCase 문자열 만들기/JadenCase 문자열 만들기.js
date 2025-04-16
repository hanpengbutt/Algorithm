function solution(s) {
    const answer = s.split(' ').map((word) => word.split('').map((v, i) => i === 0 ? v.toUpperCase() : v.toLowerCase()).join('')).join(' ');
    
    return answer;
}