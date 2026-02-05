const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const graph = new Map();
  input.slice(1).forEach((rel) => {
    const [a, b] = rel.split(" ").map(Number);
    graph.set(a, (graph.get(a) || []).concat(b));
    graph.set(b, (graph.get(b) || []).concat(a));
  });

  let answer;
  let minDis = Infinity;

  for (key of Array.from(graph.keys()).sort((a, b) => a - b)) {
    const distance = new Map();
    const queue = [key];

    distance.set(key, 0);

    while (queue.length > 0) {
      const start = queue.shift();

      graph.get(start).forEach((node) => {
        if (distance.get(node) === undefined) {
          distance.set(node, distance.get(start) + 1);
          queue.push(node);
        }
      });
    }

    const sum = Array.from(distance.values()).reduce(
      (acc, cur) => acc + cur,
      0,
    );

    if (sum < minDis) {
      answer = key;
      minDis = sum;
    }
  }

  console.log(answer);
};

solution();
