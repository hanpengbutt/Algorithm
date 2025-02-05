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
        if(this.isEmpty()) { // 큐가 비어있다면
            this.front = node;
        } else { // 큐가 비어있지 않다면
            this.rear.next = node;
        }
        this.rear = node;
    }
    
    dequeue() {
        if(!this.isEmpty()) { // 큐가 비어있지 않다면
            const node = this.front;
            this.front = node.next; 
            if(node.next === null) this.rear = null; // 노드가 한 개 있었다면
            return node.value;
        }
    }
    
    isEmpty() {
        return this.front === null;
    }
}

function solution(priorities, location) {
    const queue = new Queue();
    for(let i = 0; i < priorities.length; i++) {
        queue.enqueue(i);
    }
    
    const result = [];
    
    
    while(!queue.isEmpty()) {
        if(Math.max(...priorities) > priorities[queue.front.value]) {
            // 대기 중인 프로세스 중 우선순위가 더 높은 프로세스가 있는 경우 
            queue.enqueue(queue.dequeue());
        } else {
            priorities[queue.front.value] = 0;
            result.push(queue.dequeue());
        }
    }
    
    return result.indexOf(location) + 1;
}