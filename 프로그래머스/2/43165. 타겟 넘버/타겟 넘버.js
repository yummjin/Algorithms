function solution(numbers, target) {
  const sign = [-1, 1];
  const signedNums = numbers.map((num) =>
    Array.from({ length: 2 }, (_, i) => num * sign[i])
  );
  let cnt = 0;

  function dfs(depth, result) {
    if (depth === numbers.length) {
      // console.log(result);
      const sum = result.reduce((acc, num) => acc + num, 0);
      if (sum === target) cnt = cnt + 1;
      return;
    }

    for (let i = 0; i < signedNums[depth].length; i++) {
      // console.log(`${depth}깊이, ${signedNums[depth][i]}`);
      result.push(signedNums[depth][i]);
      dfs(depth + 1, [...result]);
      result.pop();
    }
  }

  dfs(0, []);
  // console.log(cnt);
  return cnt;
}