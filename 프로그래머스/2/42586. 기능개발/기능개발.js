function solution(progresses, speeds) {
  const N = progresses.length;
  const days = new Array(N).fill(0);
  const stack = [];
  let result = new Array(N).fill(0);
  const answer = [];

  for (let i = 0; i < N; i++) {
    days[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
  }

  let max = 0
  for (let i = 0; i < N; i++) {
    while (stack.length && stack[stack.length - 1] <= Math.max(days[i], max)) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = Math.max(days[i], max);
    } else {
      result[i] = stack[stack.length - 1];
    }

    if(result[i] > max) max = result[i]

    stack.push(days[i]);
  }

  let now = result[0];
  let count = 1;
  for (let i = 1; i < N; i++) {
    if (now === result[i]) {
      count += 1;
    } else {
      answer.push(count);
      now = result[i];
      count = 1;
    }
  }
  answer.push(count);

  return answer;
}