const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux" ? 0 : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

function solution() {
  const n = Number(input[0]);

  const primes = getPrimes(n);

  if (primes.length < 1) return 0;

  let left = 0,
    right = 0;
  let sum = 0;
  let count = 0;

  while (true) {
    if (sum >= n) {
      if (sum === n) count++;
      sum -= primes[left];
      left++;
    } else {
      if (right === primes.length) break;
      sum += primes[right];
      right++;
    }
  }

  return count;
}

function getPrimes(n) {
  const isPrime = new Uint8Array(n + 1).fill(1);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }

  const primes = [];
  for (let i = 2; i <= n; i++) if (isPrime[i]) primes.push(i);
  return primes;
}

console.log(solution());
