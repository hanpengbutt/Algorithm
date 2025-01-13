function solution(prices) {
  const N = prices.length;
  const stack = [];
  const result = new Array(N).fill(0);

  for (let i = N - 1; i > -1; i--) {
    while (stack.length && prices[stack[stack.length - 1]] >= prices[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = N - 1 - i;
    } else {
      result[i] = stack[stack.length - 1] - i;
    }

    stack.push(i);
  }

  return result;
}