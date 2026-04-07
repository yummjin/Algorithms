const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const handleCommand = (command, number) => {
    switch (command) {
      case "D":
        return (number * 2) % 10000;
      case "S":
        return number === 0 ? 9999 : number - 1;
      case "L":
        return (number % 1000) * 10 + Math.floor(number / 1000);
      case "R":
        return (number % 10) * 1000 + Math.floor(number / 10);
    }
  };

  const bfs = (start, target) => {
    const visited = Array(10000).fill(false);
    let queue = [[start, ""]];
    let head = 0;

    visited[start] = true;

    while (head < queue.length) {
      const [num, cmdStr] = queue[head++];

      if (num === target) {
        console.log(cmdStr);
        return;
      }

      for (const cmd of ["D", "S", "L", "R"]) {
        const next = handleCommand(cmd, num);

        if (!visited[next]) {
          visited[next] = true;
          queue.push([next, cmdStr + cmd]);
        }
      }
    }
  };

  const testCnt = Number(input[0]);

  for (let i = 1; i < testCnt + 1; i++) {
    const [start, target] = input[i].split(" ").map(Number);
    bfs(start, target);
  }
};

solution();
