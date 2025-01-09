const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const n = parseInt(input[0]);
  const dest = input.slice(1).map((val) => parseInt(val));
  console.log(stackToDest(n, dest));
};

function stackToDest(n, dest) {
  let stack = [];
  let result = [];
  let stringResult = [];
  let current = 1; // 현재 추가할 숫자

  for (let i = 0; i < n; i++) {
    // 현재 목표 숫자에 도달할 때까지 스택에 추가
    while (current <= dest[i]) {
      stack.push(current++);
      stringResult.push("+");
    }

    // 목표 숫자와 스택의 맨 위 요소 비교
    if (stack.pop() !== dest[i]) {
      return "NO"; // 불가능한 경우
    }
    stringResult.push("-");
  }

  return stringResult.join("\n");
}

solution();
