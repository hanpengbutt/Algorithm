let fs = require('fs');
let [N, K] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split(' ')
  .map((v) => +v);

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
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
    if (this.isEmpty()) {
      this.front = node;
      node.prev = this.front;
    } else {
      this.rear.next = node;
      this.front.prev = node;
      node.prev = this.rear;
    }
    node.next = this.front;
    this.rear = node;
  }

  dequeue() {
    if (!this.isEmpty()) {
      const node = this.front;
      if (this.front === this.rear) {
        this.front = this.rear = null;
      } else {
        this.rear.next = this.front = node.next;
        this.front.prev = this.rear;
      }
      return node.value;
    }
  }

  isEmpty() {
    return this.front === null;
  }
}

function solution(N, K) {
  const queue = new Queue();
  for (let i = 1; i <= N; i++) {
    queue.enqueue(i);
  }

  const result = []

  while (!queue.isEmpty()) {
    let nowNode = queue.front;
    for (let i = 1; i < K; i++) {
      nowNode = nowNode.next;
    }
    queue.front = nowNode;
    queue.rear = nowNode.prev;

    result.push(queue.dequeue())
  }

  return `<${result.join(', ')}>`
}

console.log(solution(N, K))
