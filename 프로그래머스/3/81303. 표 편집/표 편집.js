class Node {
  constructor(value) {
    this.value = value; // 존재 여부('O', 'X')
    this.prev = null; // 이전 노드의 인덱스
    this.next = null; // 디음 노드의 인덱스
  }
}

function solution(n, k, cmd) {
  const table = new Array(n).fill(0).map((_, i) => new Node('O'));
  for (let i = 0; i < n; i++) {
    if (i > 0) {
      table[i].prev = i - 1;
    }
    if (i < n - 1) {
      table[i].next = i + 1;
    }
  }
  const stack = [];

  let nowIdx = k; // 현재 인덱스
  let prevIdx, nextIdx, restoreIdx;
  let nowNode, restoreNode;
  for (let i = 0; i < cmd.length; i++) {
    const [c, x] = cmd[i].split(' ');

    switch (c) {
      case 'D':
        for (let j = 0; j < x; j++) {
          nowIdx = table[nowIdx].next;
        }
        break;
      case 'U':
        for (let j = 0; j < x; j++) {
          nowIdx = table[nowIdx].prev;
        }
        break;
      case 'C':
        stack.push(nowIdx);
        nowNode = table[nowIdx];
        nowNode.value = 'X';

        prevIdx = nowNode.prev;
        nextIdx = nowNode.next;

        nowIdx = nextIdx ? nextIdx : prevIdx;

        if (prevIdx !== null) {
          table[prevIdx].next = nextIdx;
        }
        if (nextIdx !== null) {
          table[nextIdx].prev = prevIdx;
        }

        break;
      case 'Z':
        restoreIdx = stack.pop();
        restoreNode = table[restoreIdx]
        restoreNode.value = 'O';

        prevIdx = restoreNode.prev;
        while (prevIdx !== null && table[prevIdx].value === 'X') {
          prevIdx = table[prevIdx].prev;
        }
        if (prevIdx !== null) {
          table[prevIdx].next = restoreIdx;
        }
        restoreNode.prev = prevIdx;

        nextIdx = restoreNode.next;
        while (nextIdx !== null && table[nextIdx].value === 'X') {
          nextIdx = table[nextIdx].next;
        }
        if (nextIdx !== null) {
          table[nextIdx].prev = restoreIdx;
        }
        restoreNode.next = nextIdx;
        break;
    }
  }

  return table.map((node) => node.value).join('');
}