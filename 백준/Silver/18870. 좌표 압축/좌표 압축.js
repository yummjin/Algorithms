const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const inputNum = input[1].split(" ").map((n) => Number(n));

  const sortedNum = [...new Set(inputNum)].sort((a, b) => a - b);
  const map = new Map();

  sortedNum.forEach((v, i) => map.set(v, i));

  const result = inputNum.map((v) => map.get(v));
  console.log(result.join(" "));
};

solution();
