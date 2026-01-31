const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const word = input[0];
  let count = 0;
  let answer = "";

  const map = new Map();

  for (const letter of word) {
    const lower = letter.toLocaleLowerCase();
    map.set(lower, map.get(lower) ? map.get(lower) + 1 : 1);
  }

  for ([key, value] of map.entries()) {
    if (count < value) {
      answer = key;
      count = value;
    }
  }

  console.log(
    Array.from(map.values()).filter((v) => v === count).length > 1
      ? "?"
      : answer.toLocaleUpperCase(),
  );
};

solution();
