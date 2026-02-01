const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const heap = [];
  let output = [];

  for (const command of input.slice(1).map(Number)) {
    actHeap(command, heap, output);
  }

  console.log(output.join("\n"));
};

const actHeap = (command, heap, output) => {
  if (command === 0) {
    output.push(popHeap(heap));
  } else {
    pushHeap(command, heap);
  }
};

const pushHeap = (value, heap) => {
  heap.push(value); // 맨 뒤에 넣음
  let idx = heap.length - 1;

  while (idx > 0) {
    const parent = Math.floor((idx - 1) / 2);

    if (heap[parent] >= heap[idx]) break; // 부모보다 작으면 break

    [heap[parent], heap[idx]] = [heap[idx], heap[parent]]; // 부모보다 크면 swap

    idx = parent;
  }
};

const popHeap = (heap) => {
  if (heap.length === 0) return 0;
  if (heap.length === 1) return heap.pop();

  const max = heap[0]; // 최댓값 저장
  heap[0] = heap.pop(); // 맨 뒤 원소를 루트로 올림

  let idx = 0; // 처음 보고 있는 노드 인덱스 (초기값이므로 루트)

  while (true) {
    let left = idx * 2 + 1; // 0일경우 1, 1일경우 3
    let right = idx * 2 + 2; // 0일경우 2, 1일경우 4
    let largest = idx; // 일단 자기 자신이 제일 크다고 가정

    if (left < heap.length && heap[left] > heap[largest]) {
      // 왼쪽 자식과 비교
      largest = left;
    }

    if (right < heap.length && heap[right] > heap[largest]) {
      // 오른쪽 자식과 비교
      largest = right;
    }

    if (largest === idx) break; // 더 이상 내려갈 필요가 있는지?
    // 위에 두 조건문을 통해 left 또는 right가 더 크다면 largest 값은 변했을 것

    [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
    idx = largest;
  }

  return max;
};

solution();
