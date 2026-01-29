const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [N, y, x] = input[0].split(" ").map(Number);

  let cy = y;
  let cx = x;

  let size = 2 ** N;
  let answer = 0;

  while (size > 1) {
    const half = size / 2;
    const block = half * half;

    if (cy < half && cx < half) {
    } else if (cy < half && cx >= half) {
      answer += block;
      cx -= half;
    } else if (cy >= half && cx < half) {
      answer += block * 2;
      cy -= half;
    } else {
      answer += block * 3;
      cx -= half;
      cy -= half;
    }

    size = half;
  }

  console.log(answer);
};

solution();