const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const targetCnt = Number(input[0]);
  const target = `${"IO".repeat(targetCnt)}I`;
  const word = input[2].split("");
  let left = 0;
  let cnt = 0;

  word.forEach((_, right) => {
    const comp = word.slice(left, right + 1);
    if (comp.length === target.length) {
      if (comp.join("") === target) {
        cnt++;
      }
      left++;
    }
  });

  console.log(cnt);
};

solution();
