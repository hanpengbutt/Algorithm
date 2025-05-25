let fs = require('fs');
let [_, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

function solution(input) {
  const deque = new Array(10 ** 4 * 2).fill(0);
  let head = (tail = 10 ** 4);
  let size = 0;

  input.forEach((i) => {
    const [op, x] = i.split(' ');

    switch (op) {
      case 'push_front':
        if (size === 0) tail--;
        deque[--head] = x;
        size++;
        break;
      case 'push_back':
        if (size === 0) head++;
        deque[++tail] = x;
        size++;
        break;
      case 'pop_front':
        if (size === 0) {
          console.log(-1);
        } else {
          console.log(deque[head]);
          size--;
          if (size > 0) head++;
        }
        break;
      case 'pop_back':
        if (size === 0) {
          console.log(-1);
        } else {
          console.log(deque[tail]);
          size--;
          if (size > 0) tail--;
        }
        break;
      case 'size':
        console.log(size);
        break;
      case 'empty':
        console.log(size === 0 ? 1 : 0);
        break;
      case 'front':
        if (size === 0) {
          console.log(-1);
        } else {
          console.log(deque[head]);
        }
        break;
      case 'back':
        if (size === 0) {
          console.log(-1);
        } else {
          console.log(deque[tail]);
        }
        break;
    }
  });
}

solution(input);
