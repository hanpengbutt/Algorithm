let fs = require('fs');
let [T, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(value) {
    const node = new Node(value);
    if (!this.isEmpty()) {
      this.rear.next = node;
    } else {
      this.front = node;
    }
    this.rear = node;
  }

  dequeue() {
    if (!this.isEmpty()) {
      const node = this.front;
      this.front = node.next;
      if (!node.next) this.rear = null;
      return node;
    }
  }

  isEmpty() {
    return this.front === null;
  }
}

function solution(N, M, priority) {
  const queue = new Queue();
  for (let i = 0; i < N; i++) {
    queue.enqueue(i);
  }

  const result = [];

  while (!queue.isEmpty()) {
    const idx = queue.front.value;
    if (Math.max(...priority) > priority[idx]) {
      queue.enqueue(queue.dequeue().value);
    } else {
      priority[idx] = 0;
      result.push(queue.dequeue().value);
    }
  }
  
  return result.indexOf(M) + 1;
}

for (let i = 0; i < +T; i++) {
  const [N, M] = input[i * 2].split(' ').map((v) => +v);
  const priority = input[i * 2 + 1].split(' ').map((v) => +v);
  console.log(solution(N, M, priority));
}
