const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const n = Number(input[0]);
  const info = input.slice(1).map((line) => line.split(" ").map(Number));

  const dp = new Int32Array(n + 2);

  for (let i = 0; i < n; i++) {
    const [t, p] = info[i];

    // 상담을 안 하는 경우
    dp[i + 1] = Math.max(dp[i + 1], dp[i]);

    // 상담을 하기로 결정한 경우
    dp[i + t] = Math.max(dp[i + t], dp[i] + p);
  }

  console.log(dp[n]);
}

solution();
