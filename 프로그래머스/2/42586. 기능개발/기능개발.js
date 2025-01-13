function solution(progresses, speeds) {
  const N = progresses.length;
  const days = new Array(N).fill(0);
  const stack = [];
  let result = new Array(N).fill(0);
  const answer = [];

  for (let i = 0; i < N; i++) {
    days[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
  }

  for (let i = 0; i < N; i++) {
    if (stack.length === 0) {
      result[i] = days[i];
      stack.push(days[i]);
    } else {
      if(days[i] > stack[stack.length - 1]) {
        stack.push(days[i])
      }
      result[i] = stack[stack.length - 1];
    }
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