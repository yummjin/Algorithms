const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const [y, x] = input[0].split(" ").map(Number);
  let sx, sy;

  const field = [];

  input.slice(1).forEach((r, y) => {
    const row = r.split("");

    if (row.findIndex((v) => v === "I") !== -1) {
      sx = row.findIndex((v) => v === "I");
      sy = y;
    }

    field.push(row);
  });

  moveField(sx, sy, { x, y }, field);

  console.log(cnt === 0 ? "TT" : cnt);
};

let cnt = 0;

const moveField = (x, y, size, field) => {
  const direction = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (const [dx, dy] of direction) {
    const nx = dx + x;
    const ny = dy + y;

    if (
      nx >= 0 &&
      nx < size.x &&
      ny >= 0 &&
      ny < size.y &&
      field[ny][nx] !== "X" &&
      field[ny][nx] !== "V"
    ) {
      field[ny][nx] === "P" && cnt++;
      field[ny][nx] = "V";
      moveField(nx, ny, size, field);
    }
  }
};

const printField = (field) => {
  for (const row of field) {
    console.log(row.join(" "));
  }
};

solution();
