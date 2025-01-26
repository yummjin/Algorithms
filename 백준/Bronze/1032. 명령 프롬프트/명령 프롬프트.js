const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const N = parseInt(input[0]);
  if (N === 1) console.log(input[1]);
  else {
    const cmd = input.slice(1);
    const diff = new Array(cmd[0].length + 1).fill(0);
    for (let i = 1; i < cmd.length; i++) {
      const letters = cmd[i].split("");
      const compLetters = cmd[i - 1].split("");
      for (let i = 0; i < letters.length; i++) {
        if (letters[i] !== compLetters[i]) diff[i] = 1;
      }
    }
    const result = cmd[0]
      .split("")
      .map((val, ind) => (diff[ind] === 1 ? (val = "?") : (val = val)));
    console.log(result.join(""));
  }
};

solution();
