const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
  const target = Number(input[0]);
  const N = Number(input[1]);
  const pattern = `${"IO".repeat(target)}I`;
  const text = input[2].split("");

  console.log(kmp(text, pattern));
};

const buildPi = (pattern) => {
  const pi = Array(pattern.length).fill(0); // 0으로 초기화된 배열
  let j = 0;

  // pi[i] 는 0에서 i까지 문자열에서 접두사와 접미사가 겹치는 부분의 최대 길이
  // i가 0일때 부분문자열은 I이고 pi[i] 는 0
  // i가 2일때 부분문자열은 IOI이고 pi[i] 는 1 (I라는 하나의 글자가 겹침)
  // i가 4일때 부분문자열은 IOI이고 pi[i] 는 3 (IOI 세글자가 겹침)

  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = pi[j - 1];
    }

    // j개까지 맞았지만 여기서 틀림
    // 그럼 처음부터 다시 보는 게 아니라
    // j 중에서 재활용 가능한 길이로 이동
    // 다시 비교해야 할 최소 위치를..

    if (pattern[i] === pattern[j]) {
      j++;
      pi[i] = j;
    }

    // i랑 j가 같으면
    // prefix가 하나 더 이어진 거니까
    // j 올리고 pi에 기록
  }

  // 따라서 pi는 앞에서 몇개의 글자가 재활용되는지를 의미한다.

  return pi;
};

const kmp = (text, pattern) => {
  const pi = buildPi(pattern);
  // pattern의 부분 일치 정보(pi 배열) 미리 계산

  let j = 0;
  // pattern에서 현재까지 맞은 길이 (포인터)

  let count = 0;

  for (let i = 0; i < text.length; i++) {
    // text를 왼쪽부터 하나씩 확인

    while (j > 0 && text[i] !== pattern[j]) {
      // 지금까지 j개 맞았는데
      // 다음 글자가 다르면
      // pi를 이용해서
      // 다시 시도할 prefix 길이로 점프
      j = pi[j - 1];
    }

    if (text[i] === pattern[j]) {
      // 현재 글자가 맞으면
      // pattern 포인터를 한 칸 증가
      j++;
    }

    if (j === pattern.length) {
      // pattern 전체를 다 맞춘 경우
      count++;
      // 하나 발견

      j = pi[j - 1];
      // 겹치는 패턴을 허용하기 위해
      // 다음 비교 위치를 pi 기준으로 이동
    }
  }
  return count;
};

solution();
