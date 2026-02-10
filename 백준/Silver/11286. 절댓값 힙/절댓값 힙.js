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
  heap.push(value);
  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (Math.abs(heap[parent]) < Math.abs(heap[index])) break;

    if (Math.abs(heap[parent]) === Math.abs(heap[index])) {
      if (heap[parent] < heap[index]) break;
    }

    [heap[parent], heap[index]] = [heap[index], heap[parent]];

    index = parent;
  }
};

const popHeap = (heap) => {
  if (heap.length === 0) return 0;
  if (heap.length === 1) return heap.pop();

  const min = heap[0];
  heap[0] = heap.pop();

  let index = 0;

  while (true) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let smallest = index;

    if (left < heap.length && Math.abs(heap[smallest]) > Math.abs(heap[left])) {
      smallest = left;
    }

    if (
      left < heap.length &&
      Math.abs(heap[smallest]) === Math.abs(heap[left])
    ) {
      if (heap[smallest] > heap[left]) smallest = left;
    }

    if (
      right < heap.length &&
      Math.abs(heap[smallest]) > Math.abs(heap[right])
    ) {
      smallest = right;
    }

    if (
      right < heap.length &&
      Math.abs(heap[smallest]) === Math.abs(heap[right])
    ) {
      if (heap[smallest] > heap[right]) smallest = right;
    }

    if (smallest === index) break;

    [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
    index = smallest;
  }

  return min;
};

solution();
