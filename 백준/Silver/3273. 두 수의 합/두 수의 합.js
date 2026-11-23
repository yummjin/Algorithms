const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const [n, arr, xr] = input;
  const x = Number(xr);

  const sorted = arr
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let count = 0;
  let left = 0;
  let right = n - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === x) {
      count++;
      left++;
      right--;
    } else if (sum < x) {
      left++;
    } else {
      right--;
    }
  }

  return count;
}

console.log(solution());
