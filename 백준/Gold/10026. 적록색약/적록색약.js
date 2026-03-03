const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const N = Number(input[0]);
  const field = [];

  for (let i = 1; i < N + 1; i++) {
    field.push(input[i].split(""));
  }

  const blindField = field.map((r) =>
    r.map((v) => (v === "R" || v === "G" ? "R" : v)),
  );

  let area = 0;

  let blindArea = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (start, color, field) => {
    const [x, y] = start;
    field[y][x] = "V";
    for (const [dx, dy] of directions) {
      const nx = dx + x;
      const ny = dy + y;
      if (nx >= 0 && nx < N && ny >= 0 && ny < N && field[ny][nx] === color) {
        dfs([nx, ny], color, field);
      }
    }
  };

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const key = field[y][x];
      if (key !== "V") {
        dfs([x, y], key, field);
        area += 1;
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const key = blindField[y][x];
      if (key !== "V") {
        dfs([x, y], key, blindField);
        blindArea += 1;
      }
    }
  }

  console.log(area, blindArea);
};

solution();
