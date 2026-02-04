const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const n = Number(input[0]);
  const fruits = input[1].split(" ").map(Number);

  let left = 0;
  let maxLen = 0;
  const cnt = new Map();

  for (let right = 0; right < n; right++) {
    cnt.set(fruits[right], (cnt.get(fruits[right]) || 0) + 1);

    while (cnt.size > 2) {
      cnt.set(fruits[left], cnt.get(fruits[left]) - 1);
      if (cnt.get(fruits[left]) === 0) {
        cnt.delete(fruits[left]);
      }
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  console.log(maxLen);
};

solution();
