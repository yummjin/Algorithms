const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const size = Number(input[0]);

  const info = input.slice(1).map((row) => row.split(" ").map(Number));

  const graph = new Map();

  for (let dest = 0; dest < size; dest++) {
    for (let start = 0; start < size; start++) {
      if (info[dest][start] === 1)
        graph.set(start, (graph.get(start) || []).concat(dest));
    }
  }

  let answer = Array.from({ length: size }, () => Array.from({ length: size }));

  for (let dest = 0; dest < size; dest++) {
    for (let start = 0; start < size; start++) {
      const visited = Array(size).fill(false);
      answer[dest][start] = findPath(start, dest, graph, visited);
    }
  }

  for (row of answer) {
    console.log(row.join(" "));
  }
};

const findPath = (start, dest, graph, visited) => {
  if (visited[start]) return 0;
  if (!graph.get(start)) return 0;

  visited[start] = true;

  const connections = graph.get(start);

  if (connections.includes(dest)) return 1;

  for (connect of connections) {
    const result = findPath(connect, dest, graph, visited);
    if (result === 1) return 1;
  }

  return 0;
};

solution();
