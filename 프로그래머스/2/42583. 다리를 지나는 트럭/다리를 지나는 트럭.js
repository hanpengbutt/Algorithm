class Node {
    constructor(weight) {
        this.progress = 1;
        this.weight = weight;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
    }
    
    enqueue(weight) {
        const node = new Node(weight);
        if(this.isEmpty()) {
            this.front = node;
        } else {
            this.rear.next = node;
        }
        this.rear = node;
    }
    
    dequeue() {
        if(!this.isEmpty()) {
            const node = this.front;
            this.front = node.next;
            if(node.next === null) this.rear = null;
            return node.weight;
        }
    }
    
    isEmpty() {
        return this.front === null;
    }
    
    increaseProgress() {
        let nowNode = this.front;
        while(nowNode) {
            nowNode.progress += 1;
            nowNode = nowNode.next;
        }
    }
}

function solution(bridge_length, weight, truck_weights) {
    const queue = new Queue();
    let weightSum = 0;
    let result = 0
    
    do {
        result += 1
        queue.increaseProgress();
        
        if(queue.front && queue.front.progress === bridge_length + 1) {
            weightSum -= queue.dequeue();
        }
        
        if(truck_weights.length > 0) {
            const nowWeight = truck_weights[0];
            if(weightSum + nowWeight <= weight) {
                weightSum += nowWeight;
                queue.enqueue(nowWeight);
                truck_weights.shift();
            }
        }
        
    } while(!queue.isEmpty());
    
    return result;
}