const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const meetings = input
    .slice(1)
    .map((m) => m.split(" ").map(Number))
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      return a[1] - b[1];
    });
  // console.log(meetings);
  countMeeting(meetings);
};

function countMeeting(meetings) {
  let current = 0;
  let count = 0;

  for ([start, end] of meetings) {
    if (start >= current) {
      current = end;
      count++;
    }
  }

  console.log(count);
}

solution();
