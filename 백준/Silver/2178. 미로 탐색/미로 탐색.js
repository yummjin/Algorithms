const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [y, x] = input[0].split(" ").map(Number);
  const field = input
    .slice(1)
    .map((row) => row.split("").map((v) => (v === "1" ? -1 : -2)));

  field[0][0] = 1;

  findPath({ x: 0, y: 0 }, field, { x: x, y: y });

  // printField(field);

  console.log(field[y - 1][x - 1]);
};

const findPath = (start, field, size) => {
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const queue = [[start.x, start.y]];

  let head = 0;

  while (head < queue.length) {
    const [sx, sy] = queue[head++];

    for (const [dx, dy] of directions) {
      const nx = dx + sx;
      const ny = dy + sy;

      if (
        nx >= 0 &&
        nx < size.x &&
        ny >= 0 &&
        ny < size.y &&
        field[ny][nx] === -1
      ) {
        field[ny][nx] = field[sy][sx] + 1;
        queue.push([nx, ny]);
      }
    }
  }
};

// const printField = (field) => {
//   for (const row of field) {
//     console.log(row.join(""));
//   }
// };

solution();
