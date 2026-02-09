const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const target = input[0].split("");
  let sum = 0;
  let multiple;

  for (let i = 0; i < target.length; i++) {
    if (target[i] !== "*") {
      if (i % 2 === 0) sum += Number(target[i]);
      else sum += Number(target[i]) * 3;
    } else {
      multiple = i % 2 === 0 ? 1 : 3;
    }
  }

  const mod10 = (n) => ((n % 10) + 10) % 10;
  let answer;

  if (multiple === 1) {
    answer = mod10(-sum);
  } else {
    answer = mod10(-sum * 7);
  }

  console.log(answer);
};

solution();
