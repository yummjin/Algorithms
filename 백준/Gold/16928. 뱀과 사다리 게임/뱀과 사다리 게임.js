const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [L, S] = input[0].split(" ").map(Number);

  const board = Array(101).fill(0);
  const visited = Array(101).fill(false);

  let idx = 1;

  for (let i = 0; i < L; i++) {
    const [a, b] = input[idx++].split(" ").map(Number);
    board[a] = b;
  }

  for (let i = 0; i < S; i++) {
    const [a, b] = input[idx++].split(" ").map(Number);
    board[a] = b;
  }

  const queue = [[1, 0]];
  visited[1] = true;
  let head = 0;

  while (head < queue.length) {
    const [pos, cnt] = queue[head++];

    if (pos === 100) {
      return console.log(cnt);
    }

    for (let dice = 1; dice <= 6; dice++) {
      let next = pos + dice;
      if (next > 100) continue;
      if (board[next] !== 0) {
        next = board[next];
      }

      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, cnt + 1]);
      }
    }
  }
};

solution();
