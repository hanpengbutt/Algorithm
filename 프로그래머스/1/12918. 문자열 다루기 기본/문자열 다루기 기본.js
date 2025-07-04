function solution(s) {
    const regEx = /^\d{4}(\d{2})?$/;
    return regEx.test(s);
}