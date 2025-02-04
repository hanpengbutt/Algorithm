class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.head !== null) {
      this.tail.next = node;
      node.prev = this.tail;
    } else {
      this.head = node;
    }
    this.tail = node;
  }

  getValues() {
    const values = [];
    let nowNode = this.head;
    while (nowNode !== null) {
      values.push(nowNode.value);
      nowNode = nowNode.next;
    }

    return values;
  }
}

function solution(n, k, cmd) {
  const linkedList = new LinkedList();
  const stack = [];

  for (let i = 0; i < n; i++) {
    linkedList.append(i);
  }

  let nowNode = linkedList.head;
  let prevNode, nextNode, restoreNode;
  for (let i = 0; i < k; i++) {
    nowNode = nowNode.next;
  }

  for (let i = 0; i < cmd.length; i++) {
    const [c, x] = cmd[i].split(' ');

    switch (c) {
      case 'U':
        for (let j = 0; j < x; j++) {
          nowNode = nowNode.prev;
        }
        break;
      case 'D':
        for (let j = 0; j < x; j++) {
          nowNode = nowNode.next;
        }
        break;
      case 'C':
        stack.push(nowNode);
        prevNode = nowNode.prev;
        nextNode = nowNode.next;
        if (prevNode !== null) {
          prevNode.next = nextNode;
        } else {
          linkedList.head = nextNode;
        }
        if (nextNode !== null) {
          nextNode.prev = prevNode;
        } else {
          linkedList.tail = prevNode;
        }
        nowNode = nextNode ? nextNode : prevNode;
        break;
      case 'Z':
        restoreNode = stack.pop();
        prevNode = restoreNode.prev;
        nextNode = restoreNode.next;
        if (prevNode !== null) {
          prevNode.next = restoreNode;
        } else {
          linkedList.head = restoreNode;
        }
        if (nextNode !== null) {
          nextNode.prev = restoreNode;
        } else {
          linkedList.tail = restoreNode;
        }
        break;
    }
  }

  const result = new Array(n).fill('X');
  linkedList.getValues().forEach((i) => (result[i] = 'O'));

  return result.join('');
}