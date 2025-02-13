const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

class Heap {
  constructor() {
    this.heap = [-Infinity];
  }

  insert(value) {
    this.heap.push(value);
    let current = this.heap.length - 1;

    while (
      current > 1 &&
      this.heap[Math.floor(current / 2)] > this.heap[current]
    ) {
      [this.heap[Math.floor(current / 2)], this.heap[current]] = [
        this.heap[current],
        this.heap[Math.floor(current / 2)],
      ];
      current = Math.floor(current / 2);
    }
  }

  delete() {
    if (this.heap.length <= 1) return 0;

    const min = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();

    let current = 1;
    while (true) {
      let smallest = current;
      const left = current * 2;
      const right = current * 2 + 1;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === current) break;

      [this.heap[current], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[current],
      ];
      current = smallest;
    }

    return min;
  }
}

const solution = () => {
  const commands = input.slice(1).map(Number);
  const minHeap = new Heap();

  const result = [];
  for (const command of commands) {
    if (command === 0) {
      result.push(minHeap.delete());
    } else {
      minHeap.insert(command);
    }
  }

  console.log(result.join("\n"));
};

solution();
