const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const size = Number(input[0]);
  const field = input
    .slice(1)
    .map((row) => row.split("").map((v) => (v === "1" ? 1 : 0)));

  const answer = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (field[y][x] === 1) {
        const groupCount = countGroup(size, field, [x, y]);
        if (groupCount > 0) {
          answer.push(groupCount);
        }
      }
    }
  }
  console.log(answer.length);
  console.log(answer.sort((a, b) => a - b).join("\n"));

  // printField(field);
};

const countGroup = (size, field, start) => {
  const [sx, sy] = start;
  let count = 0;

  const directions = [
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (const [dx, dy] of directions) {
    const nx = sx + dx;
    const ny = sy + dy;

    if (nx >= 0 && nx < size && ny >= 0 && ny < size && field[ny][nx] === 1) {
      field[ny][nx] = -1;
      count++;
      count += countGroup(size, field, [nx, ny]);
    }
  }

  return count;
};

// const printField = (field) => {
//   for (row of field) {
//     console.log(row.join(""));
//   }
// };

solution();
