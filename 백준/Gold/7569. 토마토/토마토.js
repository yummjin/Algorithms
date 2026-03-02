const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [M, N, H] = input[0].split(" ").map(Number);
  let field = [];
  let data = [];

  input.slice(1).forEach((row, index) => {
    const rowData = row.split(" ").map(Number);
    data.push(rowData);
    if (index % N === N - 1) {
      field.push(data);
      data = [];
    }
  });

  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  const queue = [];

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (field[z][y][x] === 1) {
          queue.push([z, y, x]);
        }
      }
    }
  }

  let head = 0;

  while (head < queue.length) {
    const [z, y, x] = queue[head++];

    for (const [dz, dy, dx] of directions) {
      const nz = z + dz;
      const ny = y + dy;
      const nx = x + dx;

      if (
        nz >= 0 &&
        nz < H &&
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        field[nz][ny][nx] === 0
      ) {
        field[nz][ny][nx] = field[z][y][x] + 1;
        queue.push([nz, ny, nx]);
      }
    }
  }

  let max = 0;

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (field[z][y][x] === 0) {
          console.log(-1);
          return;
        }
        max = Math.max(max, field[z][y][x]);
      }
    }
  }

  console.log(max - 1);
};

solution();
