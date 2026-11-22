const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const [n, m] = input[0].split(" ").map(Number);
  const sorted = input
    .slice(1)
    .map(Number)
    .sort((a, b) => a - b);

  let left = 0;
  let right = 0;
  let smallest = Infinity;

  while (right < n && left <= right) {
    const distance = sorted[right] - sorted[left];
    if (distance < m) right++;
    else {
      smallest = Math.min(smallest, distance);
      left++;
    }
  }

  return smallest;
}

console.log(solution());
