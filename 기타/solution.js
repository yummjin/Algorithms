const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const n = Number(input[0]);

  const dp = Array(n + 1);
  dp[0] = 0n;
  dp[1] = 1n;

  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return console.log(String(dp[n]));
}

solution();
