const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const N = Number(input[0]);
  const A = input[1].split(" ").map(Number);
  const B = input[2].split(" ").map(Number);

  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += A[i] * B[i];
  }

  console.log(sum);
};

solution();
