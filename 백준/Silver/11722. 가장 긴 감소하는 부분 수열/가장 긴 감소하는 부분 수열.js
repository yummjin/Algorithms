const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const n = Number(input[0]);
  const arr = input[1].split(" ").map(Number);
  let answer = 1;

  const dp = Array(n + 1);
  dp[0] = 1;

  for (let i = 1; i < n; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
        answer = Math.max(answer, dp[i]);
      }
    }
  }

  return console.log(answer);
}

solution();
