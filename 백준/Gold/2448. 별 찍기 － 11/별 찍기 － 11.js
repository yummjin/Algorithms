const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const n = parseInt(input[0]);
  console.log(new Tri(n).toString());
};

class Tri {
  constructor(size) {
    this.size = size;
    this.base = ["  *  ", " * * ", "*****"];
    this.triArr = this.generateTriangle(size);
  }

  generateTriangle(size) {
    if (size === 3) return this.base;

    const half = size / 2;
    const top = this.generateTriangle(half);
    const bottom = top.map((line) => line + " " + line);

    const space = " ".repeat(half);
    const topWithSpace = top.map((line) => space + line + space);

    return [...topWithSpace, ...bottom];
  }

  toString() {
    return this.triArr.join("\n");
  }
}

solution();
