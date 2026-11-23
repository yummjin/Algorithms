const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const arr = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let left = 0;
  let right = arr.length - 1;
  let best = Infinity;
  let answer = [];

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (Math.abs(best) > Math.abs(sum)) {
      best = sum;
      answer = [arr[left], arr[right]];
    }

    if (sum === 0) break;
    else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }

  console.log(answer.join(" "));
}

solution();
