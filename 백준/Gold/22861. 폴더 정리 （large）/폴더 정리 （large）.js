const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map((v) => +v);
const files = input.slice(1, N + M + 1).map((file) => file.split(' '));
const K = +input[N + M + 1];
const moves = input
  .slice(N + M + 2, N + M + 2 + K)
  .map((move) => move.split(' '));
const Q = +input[N + M + 2 + K];
const queries = input.slice(N + M + 3 + K);

function solution(N, M, K, Q, files, moves, queries) {
  class Node {
    constructor(name, isFolder) {
      this.left = null;
      if (isFolder) {
        this.right = [];
      } else {
        this.right = null;
      }
      this.name = name;
      this.isFolder = isFolder;
    }
  }

  class LinkedList {
    constructor() {
      this.head = null;
      this.preNodes = new Map();
    }

    insertFirst(node) {
      if (this.head) {
        this.head.left = node;
        node.right.push(this.head);
      }
      this.head = node;
    }

    insertAt(node, parentFolderNameOrNode) {
      let parentNode = parentFolderNameOrNode;

      if (typeof parentFolderNameOrNode === 'string') {
        parentNode = this.findNodeByFolderName(parentFolderNameOrNode);
        if (!parentNode) {
          parentNode = new Node(parentFolderNameOrNode, 1);
          this.preNodes.set(parentFolderNameOrNode, parentNode);
        }
      }

      if (
        node.isFolder ||
        !parentNode.right.find(
          (childNode) => !childNode.isFolder && childNode.name === node.name,
        )
      ) {
        parentNode.right.push(node);
        node.left = parentNode;
      }
    }

    findNodeByPath(path) {
      const p = path.split('/');
      let currentNode = this.head;

      for (let i = 0; i < p.length - 1; i++) {
        const nextNodeName = p[i + 1];
        for (let j = 0; j < currentNode.right.length; j++) {
          if (
            currentNode.right[j].isFolder &&
            currentNode.right[j].name === nextNodeName
          ) {
            currentNode = currentNode.right[j];
            break;
          }
        }
      }

      return currentNode;
    }

    findNodeByFolderName(parentFolderName) {
      let currentNode;

      const stack = [];
      stack.push(this.head, ...this.preNodes.values());

      while (stack.length) {
        currentNode = stack.pop();

        if (currentNode.name === parentFolderName) {
          return currentNode;
        }

        for (let i = 0; i < currentNode.right.length; i++) {
          const nextNode = currentNode.right[i];
          if (nextNode.isFolder) {
            stack.push(nextNode);
          }
        }
      }
    }

    moveChildNodes(fromNodePath, toNodePath) {
      const fromNode = this.findNodeByPath(fromNodePath);
      const toNode = this.findNodeByPath(toNodePath);

      fromNode.right.forEach((child) => {
        this.insertAt(child, toNode);
      });

      fromNode.left.right = fromNode.left.right.filter(
        (child) => !child.isFolder || child.name !== fromNode.name,
      );
      fromNode.left = null;
    }

    findAllFiles(parentPath) {
      const parentNode = this.findNodeByPath(parentPath);
      let [kind, count] = [new Set(), 0];

      const stack = [];
      stack.push(parentNode);

      while (stack.length) {
        const currentFolder = stack.pop();
        currentFolder.right.forEach((child) => {
          if (child.isFolder) {
            stack.push(child);
          } else {
            kind.add(child.name);
            count++;
          }
        });
      }

      return [kind.size, count];
    }
  }

  const result = [];

  const linkedList = new LinkedList();

  linkedList.insertFirst(new Node('main', 1));

  files.forEach(([P, F, C]) => {
    if (+C && linkedList.preNodes.get(F)) {
      linkedList.insertAt(linkedList.preNodes.get(F), P);
      linkedList.preNodes.delete(F);
    } else {
      linkedList.insertAt(new Node(F, +C), P);
    }
  });

  moves.forEach(([A, B]) => {
    linkedList.moveChildNodes(A, B);
  });

  queries.forEach((query) => {
    const [kind, count] = linkedList.findAllFiles(query);
    result.push(`${kind} ${count}`);
  });

  return result.join('\n');
}

console.log(solution(N, M, K, Q, files, moves, queries));
