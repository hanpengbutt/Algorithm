let fs = require('fs');
let N = BigInt(fs.readFileSync(0, 'utf8').trim());

function solution(N) {
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

    isEmpty() {
      return this.front === null;
    }

    enqueue(value) {
      const node = new Node(value);
      if (this.isEmpty()) {
        // 큐가 비어있을 때
        this.front = node;
      } else {
        // 큐가 비어있지 않을 때
        this.rear.next = node;
      }
      this.rear = node;
    }

    dequeue() {
      if (!this.isEmpty()) {
        const node = this.front;
        this.front = node.next;
        if (!this.front) this.rear = null;
        return node.value;
      }
    }
  }

  const q = new Queue();
  const visited = new Map();
  q.enqueue(N);
  visited.set(N, 1n);

  while (!visited.get(1n)) {
    const now = q.dequeue();
    if (now % 3n === 0n && !visited.get(now / 3n)) {
      visited.set(now / 3n, visited.get(now) + 1n);
      q.enqueue(now / 3n);
    }
    if (now % 2n === 0n && !visited.get(now / 2n)) {
      visited.set(now / 2n, visited.get(now) + 1n);
      q.enqueue(now / 2n);
    }
    if (!visited.get(now - 1n)) {
      visited.set(now - 1n, visited.get(now) + 1n);
      q.enqueue(now - 1n);
    }
  }

  return Number(visited.get(1n)) - 1;
}

console.log(solution(N));
