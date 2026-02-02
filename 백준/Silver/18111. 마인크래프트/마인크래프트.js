const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [row, col, inv] = input[0].split(" ").map(Number);
  const field = [];
  input.slice(1).forEach((r) => field.push(r.split(" ").map(Number)));

  const flatField = field.flatMap((r) => r.flatMap((c) => c));

  let bestTime = Infinity;
  let bestHeight = 0;

  for (H of Array.from({ length: 257 }, (_, i) => i)) {
    let time = 0;
    let inventory = inv;

    for (cell of flatField) {
      const diff = cell - H;
      time += diff < 0 ? Math.abs(diff) : Math.abs(diff) * 2;
      inventory += diff;
    }

    if (inventory >= 0) {
      if (time < bestTime) {
        bestTime = time;
        bestHeight = H;
      } else if (time === bestTime) {
        bestHeight = Math.max(bestHeight, H);
      }
    }
  }

  console.log(bestTime, bestHeight);
};

solution();
