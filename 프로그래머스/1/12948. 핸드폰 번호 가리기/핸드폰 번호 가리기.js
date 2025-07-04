function solution(phone_number) {
    return [...phone_number].map((v, i) => i < phone_number.length - 4 ? '*' : v).join('');
}