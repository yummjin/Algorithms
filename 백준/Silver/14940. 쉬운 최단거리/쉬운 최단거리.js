const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [y, x] = input[0].split(" ").map(Number);

  const field = [];
  const start = [];

  input.slice(1).forEach((row, index) => {
    const rowArr = row.split(" ").map(Number);

    const startLocation = rowArr.findIndex((element) => element === 2);

    if (startLocation !== -1) {
      start.push(startLocation);
      start.push(index);
    }

    field.push(rowArr.map((value) => (value === 1 ? -1 : 0)));
  });
  // printField(field);
  setDistance(start, { x: x, y: y }, field);
  printField(field);
};

function setDistance(start, size, field) {
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue = [];
  const [sx, sy] = start;
  field[sy][sx] = 0;

  queue.push([sx, sy]);

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of direction) {
      const nx = dx + x;
      const ny = dy + y;

      if (nx >= 0 && nx < size.x && ny >= 0 && ny < size.y) {
        if (field[ny][nx] === -1) {
          field[ny][nx] = field[y][x] + 1;

          // console.log(`nx: ${nx}, ny: ${ny}, distance: ${field[y][x] + 1}`);
          queue.push([nx, ny]);
        }
      }
    }
  }
}

function printField(field) {
  field.forEach((row) => console.log(row.join(" ")));
}

solution();
