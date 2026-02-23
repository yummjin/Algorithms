const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  let index = 0;
  const answer = [];

  let commands;

  input.slice(1).forEach((value) => {
    if (index === 0) {
      commands = value.split("");
      index += 1;
    } else if (index === 1) {
      index += 1;
    } else if (index === 2) {
      const numbers = value.match(/\d+/g)?.map(Number) ?? [];
      answer.push(handleCommand(commands, numbers));
      index = 0;
    }
  });

  console.log(answer.join("\n"));
};

const handleCommand = (commands, numbers) => {
  let front = 0;
  let back = numbers.length - 1;
  let reversed = false;
  let isError = false;

  for (const command of commands) {
    switch (command) {
      case "R":
        reversed = !reversed;
        break;
      case "D":
        if (front > back) {
          isError = true;
          break;
        }
        reversed ? back-- : front++;
    }
  }

  if (isError) {
    return "error";
  } else {
    let result = numbers.slice(front, back + 1);
    if (reversed) result.reverse();
    return `[${result.join(",")}]`;
  }
};

solution();
