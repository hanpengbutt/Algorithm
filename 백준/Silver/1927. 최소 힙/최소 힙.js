let fs = require('fs');
let [N, ...x] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n')
  .map((v) => +v);

function solution(N, x) {
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    // 크기 반환
    get size() {
      return this.heap.length;
    }

    // 추가
    add(value) {
      this.heap.push(value);

      let idx = this.size - 1;
      let parentIdx = Math.floor((idx - 1) / 2);

      while (parentIdx > -1 && this.heap[idx] <= this.heap[parentIdx]) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
        parentIdx = Math.floor((idx - 1) / 2);
      }
    }

    // 삭제
    delete() {
      if (this.size === 0) {
        return 0;
      }

      if (this.size === 1) {
        return this.heap.pop();
      }

      const min = this.heap[0];
      this.heap[0] = this.heap.pop();

      let idx = 0;
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;

      while (
        (leftIdx < this.size && this.heap[idx] > this.heap[leftIdx]) ||
        (rightIdx < this.size && this.heap[idx] > this.heap[rightIdx])
      ) {
        let childIdx = leftIdx;
        if (rightIdx < this.size && this.heap[leftIdx] > this.heap[rightIdx]) {
          childIdx = rightIdx;
        }
        this.swap(idx, childIdx);
        idx = childIdx;
        leftIdx = idx * 2 + 1;
        rightIdx = idx * 2 + 2;
      }

      return min;
    }

    // 교환
    swap(idx1, idx2) {
      [this.heap[idx2], this.heap[idx1]] = [this.heap[idx1], this.heap[idx2]];
    }
  }

  const result = [];
  const minHeap = new MinHeap();

  x.forEach((v) => {
    if (v > 0) {
      minHeap.add(v);
    } else if (v === 0) {
      result.push(minHeap.delete());
    }
  });

  return result.join('\n').trim();
}

console.log(solution(N, x));
