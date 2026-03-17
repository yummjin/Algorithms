const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const T = Number(input[0]);
  let idx = 0;
  let answer = [];

  for (let i = 0; i < T; i++) {
    idx += 1;
    const k = Number(input[idx]);

    const maxQueue = [];
    const minQueue = [];
    const count = new Map();

    for (let j = 0; j < k; j++) {
      idx += 1;
      const [cmd, num] = input[idx].split(" ");
      handleCommand(cmd, Number(num), maxQueue, minQueue, count);
    }

    // 마지막 정리
    clean(maxQueue, count, false);
    clean(minQueue, count, true);

    if (maxQueue.length === 0 || minQueue.length === 0) {
      answer.push("EMPTY");
    } else {
      answer.push(`${maxQueue[0]} ${minQueue[0]}`);
    }
  }

  console.log(answer.join("\n"));
};

const handleCommand = (cmd, num, maxQueue, minQueue, count) => {
  switch (cmd) {
    case "I":
      insertQueue(num, maxQueue, minQueue, count);
      break;
    case "D":
      if (num > 0) {
        deleteMax(maxQueue, count);
      } else {
        deleteMin(minQueue, count);
      }
      break;
  }
};

const insertQueue = (num, maxQueue, minQueue, count) => {
  pushMaxQueue(num, maxQueue);
  pushMinQueue(num, minQueue);
  count.set(num, (count.get(num) || 0) + 1); // queue는 정렬용, count를 통해 값이 살아있는지를 기록
};

// -------------------- delete --------------------

const deleteMax = (maxQueue, count) => {
  clean(maxQueue, count, false);
  if (maxQueue.length === 0) return;

  const val = popMaxQueue(maxQueue);
  count.set(val, count.get(val) - 1);
};

const deleteMin = (minQueue, count) => {
  clean(minQueue, count, true);
  if (minQueue.length === 0) return;

  const val = popMinQueue(minQueue);
  count.set(val, count.get(val) - 1);
};

// -------------------- clean --------------------

const clean = (heap, count, isMin) => {
  while (heap.length) {
    const val = heap[0];
    if (count.get(val) > 0) break;

    isMin ? popMinQueue(heap) : popMaxQueue(heap);
  }
};

// -------------------- max heap --------------------

const pushMaxQueue = (value, heap) => {
  heap.push(value);
  let idx = heap.length - 1;

  while (idx > 0) {
    const parent = Math.floor((idx - 1) / 2);

    if (heap[parent] >= heap[idx]) break;

    [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
    idx = parent;
  }
};

const popMaxQueue = (heap) => {
  if (heap.length === 1) return heap.pop();

  const top = heap[0];
  heap[0] = heap.pop();

  let idx = 0;
  while (true) {
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;
    let largest = idx;

    if (left < heap.length && heap[left] > heap[largest]) {
      largest = left;
    }

    if (right < heap.length && heap[right] > heap[largest]) {
      largest = right;
    }

    if (largest === idx) break;

    [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
    idx = largest;
  }

  return top;
};

// -------------------- min heap --------------------

const pushMinQueue = (value, heap) => {
  heap.push(value);
  let idx = heap.length - 1;

  while (idx > 0) {
    const parent = Math.floor((idx - 1) / 2);

    if (heap[parent] <= heap[idx]) break;

    [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
    idx = parent;
  }
};

const popMinQueue = (heap) => {
  if (heap.length === 1) return heap.pop();

  const top = heap[0];
  heap[0] = heap.pop();

  let idx = 0;
  while (true) {
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;
    let smallest = idx;

    if (left < heap.length && heap[left] < heap[smallest]) {
      smallest = left;
    }

    if (right < heap.length && heap[right] < heap[smallest]) {
      smallest = right;
    }

    if (smallest === idx) break;

    [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
    idx = smallest;
  }

  return top;
};

solution();
