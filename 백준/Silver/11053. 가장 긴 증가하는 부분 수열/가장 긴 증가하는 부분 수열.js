const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const nums = input[1].split(" ").map(Number);
  const dp = new Array(1001).fill(0);

  for (const num of nums) {
    dp[num] = 1;
    for (let i = 1; i < num; i++) {
      if (nums.includes(i)) {
        dp[num] = Math.max(dp[num], dp[i] + 1);
      }
    }
  }
  console.log(Math.max(...dp));
};

solution();
